<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\OAuthProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create($data);
        $this->sendVerificationToken($user);

        return response()->json(['message' => 'Account created. A verification link was sent to your email address.'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate(['email' => ['required', 'email'], 'password' => ['required', 'string']]);
        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return response()->json(['message' => 'The email address or password is incorrect.'], 422);
        }

        $request->session()->regenerate();
        /** @var User $user */
        $user = Auth::user();
        if (! $user->email_verified_at) {
            Auth::logout();
            $request->session()->invalidate();
            $this->sendVerificationToken($user);
            return response()->json(['message' => 'Verify your email before signing in. We sent you a fresh verification link.'], 403);
        }

        return response()->json(['message' => 'Signed in successfully.']);
    }

    public function redirectToGoogle(Request $request)
    {
        $state = Str::random(40);
        $request->session()->put('google_oauth_state', $state);

        return redirect('https://accounts.google.com/o/oauth2/v2/auth?'.http_build_query([
            'client_id' => config('services.google.client_id'),
            'redirect_uri' => config('services.google.redirect'),
            'response_type' => 'code',
            'scope' => 'openid email profile',
            'state' => $state,
            'access_type' => 'online',
            'prompt' => 'select_account',
        ]));
    }

    public function handleGoogleCallback(Request $request)
    {
        abort_unless(hash_equals((string) $request->session()->pull('google_oauth_state'), (string) $request->query('state')), 403);

        $tokenResponse = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'code' => $request->query('code'),
            'client_id' => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
            'redirect_uri' => config('services.google.redirect'),
            'grant_type' => 'authorization_code',
        ]);
        abort_unless($tokenResponse->successful(), 401, 'Google sign-in could not be completed.');

        $profile = Http::withToken($tokenResponse->json('access_token'))->get('https://openidconnect.googleapis.com/v1/userinfo');
        abort_unless($profile->successful() && $profile->json('email_verified') && $profile->json('email') && $profile->json('sub'), 401, 'Google did not provide a verified email address.');

        $googleId = (string) $profile->json('sub');
        $provider = OAuthProvider::findByProvider('google', $googleId);

        if ($provider) {
            $user = $provider->user;
        } else {
            $user = User::firstOrCreate(['email' => $profile->json('email')], [
                'name' => $profile->json('name') ?: $profile->json('given_name') ?: 'Google user',
                'password' => Hash::make(Str::random(40)),
                'email_verified_at' => now(),
            ]);

            OAuthProvider::updateOrCreate(
                ['user_id' => $user->id, 'provider' => 'google'],
                [
                    'provider_id' => $googleId,
                    'profile_data' => [
                        'email' => $profile->json('email'),
                        'name' => $profile->json('name'),
                        'picture' => $profile->json('picture'),
                        'email_verified' => true,
                    ],
                    'connected_at' => now(),
                ],
            );
        }

        if (! $user->email_verified_at || $user->google_id !== $googleId) {
            $user->forceFill(['email_verified_at' => now(), 'google_id' => $googleId])->save();
        }
        Auth::login($user, true);
        $request->session()->regenerate();

        return redirect(config('app.frontend_url').'/dashboard?auth=google');
    }

    public function verifyEmail(string $token)
    {
        $record = DB::table('email_verification_tokens')->where('token_hash', hash('sha256', $token))->whereNull('used_at')->where('expires_at', '>', now())->first();
        if (! $record) return redirect(config('app.frontend_url').'/email-verified?status=invalid');

        DB::transaction(function () use ($record): void {
            User::whereKey($record->user_id)->whereNull('email_verified_at')->update(['email_verified_at' => now()]);
            DB::table('email_verification_tokens')->where('id', $record->id)->update(['used_at' => now(), 'updated_at' => now()]);
        });

        return redirect(config('app.frontend_url').'/email-verified?status=success');
    }

    private function sendVerificationToken(User $user): void
    {
        $token = Str::random(64);
        DB::table('email_verification_tokens')->updateOrInsert(
            ['user_id' => $user->id],
            ['token_hash' => hash('sha256', $token), 'expires_at' => now()->addHours(24), 'used_at' => null, 'updated_at' => now(), 'created_at' => now()],
        );
        $url = rtrim(config('app.url'), '/').'/email/verify/'.$token;

        Mail::raw("Verify your Paikari email address by opening this link:\n\n{$url}\n\nThis link expires in 24 hours and can only be used once.", function ($message) use ($user): void {
            $message->to($user->email, $user->name)->subject('Verify your Paikari email address');
        });
    }
}
