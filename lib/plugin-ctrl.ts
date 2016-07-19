module HatcheryPlugin
{
    /*
    * The payment type of the user (This must match those in the app-engine enum)
    */
    export enum UserPlan
    {
        Free = 1,
        Bronze,
        Silver,
        Gold,
        Platinum,
        Custom
    }

    /**
    * A Class for managing the plugins screen
    */
    export class PluginCtrl
    {
        public plugins: Array<Engine.IPlugin>;
        public error: boolean;
        public errorMsg: string;
        public loading: boolean;
        public pluginToken: Engine.IPlugin;
        public showNewPluginForm: boolean;
        public editMode: boolean;
        public scope: any;
        public successMessage: string;
        public pager: clientAdmin.IPagerRemote;
        public http: ng.IHttpService;
        public showMediaBrowser: boolean;
        public targetImgReciever: string;
        public searchKeyword: string;
        private _q: ng.IQService;

        public static $inject = ["$scope", "$http", "$q"];
        constructor(scope, http: ng.IHttpService, $q: ng.IQService)
        {
            this.plugins = [];
            this.error = false;
            this.errorMsg = "";
            this.loading = false;
            this.http = http;
            this.scope = scope;
            this.successMessage = "";
            this.searchKeyword = "";
            this.editMode = false;
            this.pluginToken = {};
            this.pager = this.createPagerRemote();
            this._q = $q;

            scope.planEnum = UserPlan;
            scope.plans = [];
            for (var i in UserPlan)
                if (!isNaN(parseInt(i)))
                    scope.plans.push({ value: parseFloat(i), name: UserPlan[i] });
                else
                    break;

            scope.removePlugin = this.removePlugin.bind(this);
        }

        editPluginMode(plugin: Engine.IPlugin)
        {
            this.newPluginMode();
            this.editMode = true;
            this.loading = true;
            this.showNewPluginForm = true;

            var that = this;
            that.http.get<ModepressAddons.IGetPlugins>(`${_variables['appEngineUrl']}/app-engine/plugins/${plugin._id}`).then(function (response)
            {
                that.pluginToken = response.data.data[0];

                that.loading = false;
            });
        }

        /**
        * Removes a plugin
        */
        removePlugin(plugin: Engine.IPlugin)
        {
            this.loading = true;
            var that = this;
            that.error = false;
            that.errorMsg = "";

            that.http.delete<Modepress.IResponse>(`${_variables['appEngineUrl']}/app-engine/plugins/${plugin._id}`).then(function (response)
            {
                if (that.pluginToken = response.data.error)
                {
                    that.error = true;
                    that.errorMsg = response.data.message;
                    return;
                }

                that.plugins.splice(that.plugins.indexOf(plugin), 1);
            }).catch(function( err : Error ) {
                that.error = true;
                that.errorMsg = err.message;
            }).finally( function() {
                (<any>plugin).confirmDelete = false;
                that.loading = false;
            });
        }

        createPagerRemote(): clientAdmin.IPagerRemote
        {
            var that = this;
            var remote: clientAdmin.IPagerRemote = {
                update: function(index?: number, limit? : number)
                {
                    return new that._q<number>(function(resolve, reject) {

                        that.loading = true;
                        that.error = false;
                        that.errorMsg = "";

                        var toRet = that.http.get<ModepressAddons.IGetPlugins>(`${_variables['appEngineUrl']}/app-engine/plugins?index=${index}&limit=${limit}&search=${that.searchKeyword}`);
                        toRet.then(function (response)
                        {
                            that.plugins = response.data.data;
                            resolve(response.data.count);

                        }).catch(function (err: Error)
                        {
                            that.error = true;
                            that.errorMsg = err.message;

                        }).finally(function ()
                        {
                            that.loading = false
                        });
                    });
                }
            }

            return remote;
        }


        /**
        * Creates a new plugin
        */
        createPlugin()
        {
            this.scope.newPluginForm.$setSubmitted();

            if (this.scope.newPluginForm.$valid == false)
                return;

            var that = this;
            this.error = false;
            this.errorMsg = "";
            this.loading = true;
            var pluginToken = this.pluginToken;

            if (this.editMode)
            {
                that.http.put<Modepress.IGetPost>(`${_variables['appEngineUrl']}/app-engine/plugins/${pluginToken._id}`, pluginToken).then(function (token)
                {
                    if (token.data.error)
                    {
                        that.error = true;
                        that.errorMsg = token.data.message;
                    }
                    else
                    {
                        that.successMessage = token.data.message;
                        for (var i = 0, l = that.plugins.length; i < l; i++)
                            if (that.plugins[i]._id == that.pluginToken._id)
                            {
                                that.plugins.splice(i, 1, that.pluginToken);
                                break;
                            }
                        pluginToken.lastModified = Date.now();
                    }

                    that.loading = false;
                });
            }
            else
            {
                that.http.post<ModepressAddons.ICreatePlugin>(`${_variables['appEngineUrl']}/app-engine/plugins`, pluginToken).then(function (response)
                {
                    if (response.data.error)
                    {
                        that.error = true;
                        that.errorMsg = response.data.message;
                    }
                    else
                    {
                        that.plugins.push(response.data.data);
                        that.showNewPluginForm = false;
                    }

                    that.loading = false;
                });
            }
        }

        /**
        * Opens the media browser
        */
        openMediaBrowser()
        {
            this.showMediaBrowser = true;
        }

        /**
        * Closes the media browser
        */
        closeMediaBrowser()
        {
            this.showMediaBrowser = false;
        }

        /**
        * Selects a file from the media browser
        */
        selectFile(file: UsersInterface.IFileEntry)
        {
            this.showMediaBrowser = false;
            this.pluginToken.image = file.publicURL;
        }

        /**
        * Sets the page into post mode
        */
        newPluginMode()
        {
            this.scope.newPluginForm.$setUntouched();
            this.scope.newPluginForm.$setPristine();
            this.pluginToken = {
                name: "",
                description: "",
                plan: UserPlan.Free,
                deployables: [],
                image: "",
                author: "Mathew Henson",
                version: "0.0.1"
            };

            this.editMode = false;
            this.successMessage = "";
            this.showNewPluginForm = !this.showNewPluginForm
        }
    }
}