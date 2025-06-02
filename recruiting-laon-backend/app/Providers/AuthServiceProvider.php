<?php

namespace App\Providers;

use App\Models\User; 
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Define um Gate chamado 'manage-titles'
        // Ele verifica se o usuário logado tem a propriedade is_admin como true
        Gate::define('manage-titles', function (User $user) {
            return $user->isAdmin(); 
        });

        // definir outros gates para outras ações de admin se necessário
        // Gate::define('view-admin-dashboard', function (User $user) {
        //     return $user->is_admin;
        // });
    }
}
