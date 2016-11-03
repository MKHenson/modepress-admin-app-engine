namespace HatcheryPlugin {
    /*
    * The payment type of the user (This must match those in the hatchery editor enum)
    */
    export enum UserPlan {
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
    export class PluginCtrl {
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

        public static $inject = [ '$scope', '$http', '$q' ];
        constructor( scope, http: ng.IHttpService, $q: ng.IQService ) {
            this.plugins = [];
            this.error = false;
            this.errorMsg = '';
            this.loading = false;
            this.http = http;
            this.scope = scope;
            this.successMessage = '';
            this.searchKeyword = '';
            this.editMode = false;
            this.pluginToken = {};
            this.pager = this.createPagerRemote();
            this._q = $q;

            scope.planEnum = UserPlan;
            scope.plans = [];
            for ( const i in UserPlan )
                if ( !isNaN( parseInt( i ) ) )
                    scope.plans.push( { value: parseFloat( i ), name: UserPlan[ i ] });
                else
                    break;

            scope.removePlugin = this.removePlugin.bind( this );
        }

        editPluginMode( plugin: Engine.IPlugin ) {
            this.newPluginMode();
            this.editMode = true;
            this.loading = true;
            this.showNewPluginForm = true;

            this.http.get<ModepressAddons.IGetPlugins>( `${_variables[ 'appEngineUrl' ]}/app-engine/plugins/${plugin._id}` ).then(( response ) => {
                this.pluginToken = response.data!.data[ 0 ];

                this.loading = false;
            });
        }

        /**
        * Removes a plugin
        */
        removePlugin( plugin: Engine.IPlugin ) {
            this.loading = true;
            this.error = false;
            this.errorMsg = '';

            this.http.delete<Modepress.IResponse>( `${_variables[ 'appEngineUrl' ]}/app-engine/plugins/${plugin._id}` ).then(( response ) => {
                if ( this.pluginToken = response.data!.error ) {
                    this.error = true;
                    this.errorMsg = response.data!.message;
                    return;
                }

                this.plugins.splice( this.plugins.indexOf( plugin ), 1 );
            }).catch(( err: Error ) => {
                this.error = true;
                this.errorMsg = err.message;
            }).finally(() => {
                ( <any>plugin ).confirmDelete = false;
                this.loading = false;
            });
        }

        createPagerRemote(): clientAdmin.IPagerRemote {
            const remote: clientAdmin.IPagerRemote = {
                update: ( index?: number, limit?: number ) => {
                    return new this._q<number>(( resolve, reject ) => {

                        this.loading = true;
                        this.error = false;
                        this.errorMsg = '';

                        const toRet = this.http.get<ModepressAddons.IGetPlugins>( `${_variables[ 'appEngineUrl' ]}/app-engine/plugins?index=${index}&limit=${limit}&search=${this.searchKeyword}` );
                        toRet.then(( response ) => {
                            this.plugins = response.data!.data;
                            resolve( response.data!.count );

                        }).catch(( err: Error ) => {
                            this.error = true;
                            this.errorMsg = err.message;

                        }).finally(() => {
                            this.loading = false
                        });
                    });
                }
            }

            return remote;
        }


        /**
        * Creates a new plugin
        */
        createPlugin() {
            this.scope.newPluginForm.$setSubmitted();

            if ( this.scope.newPluginForm.$valid === false )
                return;

            this.error = false;
            this.errorMsg = '';
            this.loading = true;
            const pluginToken = this.pluginToken;

            if ( this.editMode ) {
                this.http.put<Modepress.IGetPost>( `${_variables[ 'appEngineUrl' ]}/app-engine/plugins/${pluginToken._id}`, pluginToken ).then(( token ) => {
                    if ( token.data!.error ) {
                        this.error = true;
                        this.errorMsg = token.data!.message;
                    }
                    else {
                        this.successMessage = token.data!.message;
                        for ( let i = 0, l = this.plugins.length; i < l; i++ )
                            if ( this.plugins[ i ]._id === this.pluginToken._id ) {
                                this.plugins.splice( i, 1, this.pluginToken );
                                break;
                            }
                        pluginToken.lastModified = Date.now();
                    }

                    this.loading = false;
                });
            }
            else {
                this.http.post<ModepressAddons.ICreatePlugin>( `${_variables[ 'appEngineUrl' ]}/app-engine/plugins`, pluginToken ).then(( response ) => {
                    if ( response.data!.error ) {
                        this.error = true;
                        this.errorMsg = response.data!.message;
                    }
                    else {
                        this.plugins.push( response.data!.data );
                        this.showNewPluginForm = false;
                    }

                    this.loading = false;
                });
            }
        }

        /**
        * Opens the media browser
        */
        openMediaBrowser() {
            this.showMediaBrowser = true;
        }

        /**
        * Closes the media browser
        */
        closeMediaBrowser() {
            this.showMediaBrowser = false;
        }

        /**
        * Selects a file from the media browser
        */
        selectFile( file: UsersInterface.IFileEntry ) {
            this.showMediaBrowser = false;
            this.pluginToken.image = file.publicURL;
        }

        /**
        * Sets the page into post mode
        */
        newPluginMode() {
            this.scope.newPluginForm.$setUntouched();
            this.scope.newPluginForm.$setPristine();
            this.pluginToken = {
                name: '',
                description: '',
                plan: UserPlan.Free,
                deployables: [],
                image: '',
                author: 'Mathew Henson',
                version: '0.0.1'
            };

            this.editMode = false;
            this.successMessage = '';
            this.showNewPluginForm = !this.showNewPluginForm
        }
    }
}