declare module clientAdmin {
    /**
    * Controller for the dashboard users section
    */
    class SEOCtrl {
        protected cacheURL: string;
        protected showRenders: boolean;
        protected renders: Array<Modepress.IRender>;
        private _q;
        private error;
        private loading;
        private errorMsg;
        private pager;
        private searchTerm;
        private _rs;
        static $inject: string[];
        constructor(scope: any, cacheURL: string, $q: ng.IQService, renders: ModepressClientPlugin.RenderService);
        /**
         * Fetches the users from the database
         * @returns {IPagerRemote}
         */
        createPagerRemote(): IPagerRemote;
        /**
        * Clears all render items
        */
        clearRenders(): void;
        /**
        * Removes a render from the database
        */
        removeRender(render: Modepress.IRender): void;
    }
}
declare module clientAdmin {
    /**
    * Controller for the login HTML
    */
    class LoginCtrl {
        private http;
        private q;
        private loginToken;
        private error;
        private errorMsg;
        private usersURL;
        private loading;
        private _state;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService, usersURL: string, state: ng.ui.IStateService);
        /**
        * Attempts to log the user in
        */
        logIn(): void;
    }
}
declare module clientAdmin {
    /**
    * Controller for the registration HTML
    */
    class RegisterCtrl {
        private http;
        private q;
        private registerToken;
        private error;
        private errorMsg;
        private showSuccessMessage;
        private successMessage;
        private loading;
        private usersURL;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService, capthaPublicKey: string, usersURL: string);
        /**
        * Resends the activation link
        */
        resendActivation(): void;
        /**
        * Attempts to register a new user
        */
        register(): void;
    }
}
declare module clientAdmin {
    /**
    * Controller for the password reset html
    */
    class PasswordCtrl {
        private http;
        private q;
        private loginToken;
        private error;
        private errorMsg;
        private usersURL;
        private loading;
        private origin;
        private complete;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService, usersURL: string, stateParams: any);
        /**
        * Sends another request to reset the password
        */
        resendRequest(): void;
        /**
        * Attempts to reset the password based on the current credentials
        */
        resetPassword(): void;
    }
}
declare module clientAdmin {
    /**
    * Controller for the dashboard media section
    */
    class MediaCtrl {
        private usersURL;
        folderFormVisible: boolean;
        scope: any;
        entries: Array<any>;
        selectedEntities: Array<UsersInterface.IBucketEntry | UsersInterface.IFileEntry>;
        selectedEntity: UsersInterface.IBucketEntry | UsersInterface.IFileEntry;
        selectedFolder: UsersInterface.IBucketEntry;
        uploader: any;
        confirmDelete: boolean;
        editMode: boolean;
        multiSelect: boolean;
        editFileMode: boolean;
        private _q;
        private http;
        private error;
        private loading;
        private errorMsg;
        private pager;
        private searchTerm;
        static $inject: string[];
        constructor(scope: any, http: ng.IHttpService, usersURL: string, upload: any, $q: ng.IQService);
        upload(files: any): void;
        /**
        * Creates a new folder
        */
        newFolder(): void;
        /**
        * Attempts to open a folder
        */
        openFolder(folder: UsersInterface.IBucketEntry): void;
        /**
        * Removes the selected entities
        */
        removeEntities(): void;
        /**
        * Attempts to rename a file
        */
        renameFile(file: UsersInterface.IFileEntry): void;
        /**
        * Sets the selected status of a file or folder
        */
        selectEntity(entity: any): void;
        /**
         * Fetches the media entries (folers/actual media) from the database
         * @returns {IPagerRemote}
         */
        createPagerRemote(): IPagerRemote;
    }
}
declare module clientAdmin {
    /**
    * Controller for the dashboard users section
    */
    class UsersCtrl {
        private newUser;
        private usersURL;
        protected users: Array<UsersInterface.IUserEntry>;
        showUserForm: boolean;
        scope: any;
        private _q;
        private http;
        private error;
        private loading;
        private errorMsg;
        private pager;
        private searchTerm;
        static $inject: string[];
        constructor(scope: any, http: ng.IHttpService, usersURL: string, $q: ng.IQService);
        /**
        * Opens the new user form
        */
        newUserMode(): void;
        /**
         * Fetches the users from the database
         * @returns {IPagerRemote}
         */
        createPagerRemote(): IPagerRemote;
        /**
        * Removes a user from the database
        * @param {UsersInterface.IUserEntry} user The user to remove
        */
        removeUser(user: UsersInterface.IUserEntry): void;
        /**
        * Creates a new user
        */
        createNewUser(): void;
    }
}
declare module clientAdmin {
    /**
    * Controller for the dashboard posts section
    */
    class PostsCtrl {
        postToken: Modepress.IPost;
        posts: Array<Modepress.IPost>;
        showNewPostForm: boolean;
        editMode: boolean;
        scope: any;
        successMessage: string;
        tagString: string;
        newCategoryMode: boolean;
        showCategoryDelete: boolean;
        categories: Array<Modepress.ICategory>;
        categoryToken: Modepress.ICategory;
        searchKeyword: string;
        searchCategory: string;
        sortOrder: string;
        sortType: string;
        showFilters: boolean;
        showMediaBrowser: boolean;
        defaultSlug: string;
        targetImgReciever: string;
        private _q;
        private _ps;
        private _cs;
        private error;
        private loading;
        private errorMsg;
        private pager;
        static $inject: string[];
        constructor(scope: any, curCategories: Modepress.IGetCategories, $q: ng.IQService, ps: ModepressClientPlugin.PostService, cs: ModepressClientPlugin.CategoryService);
        initializeTiny(): void;
        /**
        * Opens the media browser
        */
        openMediaBrowser(target?: string): void;
        /**
        * Closes the media browser
        */
        closeMediaBrowser(): void;
        /**
        * Selects a file from the media browser
        */
        selectFile(file: UsersInterface.IFileEntry): void;
        /**
        * Makes sure the slug doesnt have any spaces
        */
        checkSlug(): void;
        /**
        * Sets the slug to be the same as the title - except with spaces and in lower case (only if not touched first by user)
        */
        updateDefaultSlug(form: any): void;
        swapOrder(): void;
        swapSortType(): void;
        /**
        * Sets the page into post mode
        */
        newPostMode(): void;
        /**
        * Sets the page into edit mode
        */
        editPostMode(post: Modepress.IPost): void;
        createPagerRemote(): IPagerRemote;
        /**
        * Processes the tags in a post array of keywords
        */
        processTags(): void;
        /**
        * Removes a tag from the post array
        */
        removeTag(tag: string): void;
        /**
        * Removes a user from the database
        * @param {UsersInterface.IUserEntry} user The user to remove
        */
        removePost(post: Modepress.IPost): void;
        /**
        * Removes a category from the database by ID
        * @param {modepress.ICategory} category The category to remove
        */
        removeCategory(category: Modepress.ICategory): void;
        /**
        * Creates a new user
        */
        createPost(): void;
        /**
        * Creates a new category
        */
        createCategory(): void;
        /**
        * Adds this category to the post's selected categories
        */
        selectCategory(category: Modepress.ICategory): void;
    }
}
declare module clientAdmin {
    interface CustomComment extends Modepress.IComment {
        $editing?: boolean;
        $content?: string;
    }
    /**
    * Controller for the dashboard comments section
    */
    class CommentsCtrl {
        comments: Array<Modepress.IComment>;
        scope: any;
        searchKeyword: string;
        sortOrder: string;
        sortType: string;
        showFilters: boolean;
        private _q;
        private _ps;
        private _cs;
        private error;
        private loading;
        private errorMsg;
        private pager;
        static $inject: string[];
        constructor(scope: any, $q: ng.IQService, ps: ModepressClientPlugin.PostService, cs: ModepressClientPlugin.CommentService);
        swapOrder(): void;
        swapSortType(): void;
        /**
         * Given comment goes into an edit mode
         * @param {CustomComment} comment The comment to edit
         * @param {number} index The index of the comment
         */
        edit(comment: CustomComment, index: number): void;
        /**
         * Creates a pager remote control
         */
        createPagerRemote(): IPagerRemote;
        /**
         * Edits a comment on the fly
         * @param {Modepress.IComment} comment The comment we are editing
         * @param {Modepress.IComment} editBody The comment variables we are updating
         */
        quickEdit(comment: CustomComment, editBody: CustomComment): void;
        /**
        * Removes a comment from the database
        * @param {Modepress.IComment} comment The comment to remove
        */
        removeComment(comment: CustomComment): void;
    }
}
declare module clientAdmin {
    /**
    * Interface for the object you pass as the directive's 'interface' attribute
    */
    interface IPagerRemote {
        update: (index?: number, limit?: number) => ng.IPromise<number>;
        invalidate?: () => void;
        goFirst?: () => void;
        goLast?: () => void;
    }
    /**
    * Controller for the dashboard media section
    */
    class Pager implements ng.IDirective {
        restrict: string;
        transclude: boolean;
        templateUrl: string;
        scope: {
            interface: string;
            index: string;
            limit: string;
            last: string;
        };
        constructor();
        link: (scope: any, elem: JQuery, attributes: ng.IAttributes, ngModel: ng.INgModelController) => void;
        /**
         * Creates an intance of the pager directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Sets the focus of an element when the hide and show attributes change
    */
    class FocusOnShow implements ng.IDirective {
        link: any;
        restrict: 'A';
        private _timeout;
        static $inject: any[];
        constructor(timeout?: ng.ITimeoutService);
        _link(scope: any, elem: JQuery, attributes: any, ngModel: any): void;
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Controller for the dashboard media section
    */
    class SearchBar implements ng.IDirective {
        restrict: string;
        template: string;
        scope: {
            onClick: string;
            value: string;
        };
        constructor();
        /**
         * Creates an intance of the pager directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Creates a blue add button
    */
    class SimpleButton implements ng.IDirective {
        restrict: string;
        template: string;
        scope: {
            text: string;
            noIcon: string;
        };
        constructor(color?: string, template?: string);
        link(scope: any, elem: JQuery, attributes: angular.IAttributes, ngModel: angular.INgModelController): void;
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
    /**
    * Creates a blue add button
    */
    class AddButton extends SimpleButton {
        constructor();
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
    /**
    * Creates a red remove button
    */
    class RemoveButton extends SimpleButton {
        constructor();
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
    /**
    * Creates a green approve button
    */
    class ApproveButton extends SimpleButton {
        constructor();
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
    /**
    * Creates a blue button that toggles from an expanded to contracted state (+ -)
    */
    class ToggleButton implements ng.IDirective {
        restrict: string;
        template: string;
        scope: {
            text: string;
            expanded: string;
        };
        constructor();
        link(scope: any, elem: JQuery, attributes: angular.IAttributes, ngModel: angular.INgModelController): void;
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Small directive for a detail section
    */
    class Detail implements ng.IDirective {
        restrict: string;
        template: string;
        transclude: boolean;
        scope: {
            text: string;
            info: string;
            onRender: string;
        };
        link(scope: any): void;
        /**
         * Creates an intance of the pager directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Controller for the modal window that shows up when an error occurs
    */
    class ErrorModal implements ng.IDirective {
        restrict: string;
        templateUrl: string;
        scope: {
            visible: string;
            message: string;
        };
        constructor();
        /**
         * Creates an intance of the directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
     * Small directive that represents an div item that has a preview, content and delete section.
     * Ideal for database entries displayed in a list.
     */
    class ItemPanel implements ng.IDirective {
        restrict: string;
        transclude: {
            [slot: string]: string;
        };
        templateUrl: string;
        scope: {
            onDelete: string;
            model: string;
            confirmDelete: string;
        };
        link(scope: any): void;
        /**
         * Creates an intance of the pager directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Simple directive for each state header
    */
    class StateHeader implements ng.IDirective {
        transclude: boolean;
        restrict: string;
        template: string;
        scope: {
            text: string;
            loading: string;
        };
        /**
         * Creates an intance of the pager directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * Simple directive a checkbox
    */
    class TickBox implements ng.IDirective {
        transclude: boolean;
        restrict: string;
        template: string;
        scope: {
            text: string;
            checked: string;
            onTicked: string;
            tickType: string;
        };
        link(scope: any): void;
        /**
         * Creates an intance of the pager directive
         */
        static factory(): ng.IDirectiveFactory;
    }
}
declare module clientAdmin {
    /**
    * An authentication service for checking if the user is logged in
    */
    class Authenticator {
        private _http;
        private _q;
        private _usersURL;
        static user: UsersInterface.IUserEntry;
        static $inject: string[];
        constructor(http: ng.IHttpService, q: ng.IQService, usersURL: string);
        /**
        * Logs the user out if they are already logged in
        * @returns {ng.IPromise<boolean>}
        */
        logout(): ng.IPromise<boolean>;
        /**
        * Checks to see if the current session is authenticated
        * @returns {ng.IPromise<boolean>}
        */
        authenticated(): ng.IPromise<boolean>;
    }
}
declare module clientAdmin {
    /**
    * Configures the Angular application
    */
    class Config {
        static $inject: string[];
        /**
        * Creates an instance of the configurator
        */
        constructor(routeProvider: angular.ui.IUrlRouterProvider, stateProvider: angular.ui.IStateProvider, $locationProvider: angular.ILocationProvider, $httpProvider: angular.IHttpProvider, cfpLoadingBarProvider: any);
    }
}
declare var _users: string;
declare var _cache: string;
declare var _plugins: Array<clientAdmin.IAdminPlugin>;
/**
* The admin code for the website
*/
declare module clientAdmin {
}
