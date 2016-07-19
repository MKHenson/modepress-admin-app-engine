﻿declare var _variables : { [name: string]: string };

module HatcheryPlugin
{
    export class AppEnginePlugin implements clientAdmin.IAdminPlugin
    {
        dashboardLinks: Array<clientAdmin.IDashLik>;

        constructor()
        {
            _plugins
            this.dashboardLinks = [{
                icon: "/plugins/app-engine/media/hatchery-icon.png",
                label: "Hatchery",
                state: "default.hatchery-users",
                children: [{
                    icon: "/media/images/users.png",
                    label: "Users",
                    state: "default.hatchery-users"
                },
                {
                    icon: "/plugins/app-engine/media/hatchery-plugins.png",
                    label: "Plugins",
                    state: "default.hatchery-plugins"
                }]
            }];
        }

        /**
        * Called when the application module is being setup
        */
        onInit(mod: angular.IModule): void
        {
            mod.controller("pluginCtrl", PluginCtrl);
        }

        /**
        * Called when the states are being setup in config
        */
        onStatesInit(stateProvider: angular.ui.IStateProvider): void
        {
            stateProvider
                .state('default.hatchery-plugins', <ng.ui.IState>{
                    templateUrl: 'plugins/app-engine/templates/hatchery-plugins.html',
                    authenticate: true,
                    controller: "pluginCtrl",
                    controllerAs: "controller",
                    url: "hatchery-plugins"
                });
        }
    }
}

_plugins.push(new HatcheryPlugin.AppEnginePlugin());