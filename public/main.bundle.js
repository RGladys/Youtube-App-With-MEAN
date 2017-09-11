webpackJsonp([1,4],{

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        //Production:
        // domain = environment.domain; 
        this.domain = "";
    }
    //Register methods
    AuthService.prototype.register = function (user) {
        return this.http.post(this.domain + 'auth/register', user).map(function (res) { return res.json(); });
    };
    AuthService.prototype.checkUsername = function (username) {
        return this.http.get(this.domain + 'auth/checkUsername/' + username).map(function (res) { return res.json(); });
    };
    AuthService.prototype.checkEmail = function (email) {
        return this.http.get(this.domain + 'auth/checkEmail/' + email).map(function (res) { return res.json(); });
    };
    //Login methods
    AuthService.prototype.login = function (user) {
        return this.http.post(this.domain + 'auth/login', user).map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    //Authentication
    AuthService.prototype.createAuthenticationHeaders = function () {
        this.authToken = localStorage.getItem('token');
        this.header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
                'Content-Type': 'application/json',
                'authorisation': this.authToken
            })
        });
    };
    AuthService.prototype.getProfile = function () {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'auth/profile', this.header).map(function (res) { return res.json(); });
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/auth.service.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(authService, postsService, domSanitizer) {
        this.authService = authService;
        this.postsService = postsService;
        this.domSanitizer = domSanitizer;
        this.test = "test";
        this.linkvideo = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/cYMCLz5PQVw');
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.username = profile.user.username;
        });
        this.getAllPosts();
    };
    DashboardComponent.prototype.getAllPosts = function () {
        var _this = this;
        this.postsService.getAllPosts().subscribe(function (posts) {
            _this.postsArray = posts.posts;
            console.log(_this.postsArray[0].link);
        });
    };
    DashboardComponent.prototype.enableLink = function (link) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(link);
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(692),
            styles: [__webpack_require__(679)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _c) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/dashboard.component.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(693),
            styles: [__webpack_require__(680)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/home.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.processing = false;
        this.form = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required]
        });
    }
    LoginComponent.prototype.onLoginSumbit = function () {
        var _this = this;
        this.processing = true;
        var user = {
            username: this.form.get('username').value,
            password: this.form.get('password').value
        };
        this.authService.login(user).subscribe(function (data) {
            if (!data.success) {
                _this.processing = false;
                _this.messageClass = "alert alert-danger";
                _this.message = data.message;
            }
            else {
                _this.messageClass = "alert alert-success";
                _this.message = data.message;
                _this.authService.storeUserData(data.token, data.user);
                setTimeout(function () {
                    _this.router.navigate(['/dashboard']);
                }, 1000);
            }
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(694),
            styles: [__webpack_require__(681)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/login.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyProfileComponent = (function () {
    function MyProfileComponent(authService, postsService, domSanitizer) {
        this.authService = authService;
        this.postsService = postsService;
        this.domSanitizer = domSanitizer;
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (data) {
            _this.username = data.user.username;
            _this.email = data.user.email;
            _this.postsService.getAllPostsBy(_this.username).subscribe(function (data) {
                if (!data.success) {
                    console.log('No posts by this user');
                }
                else {
                    _this.posts = data.message;
                    _this.postsNumber = data.message.length;
                }
            });
        });
    };
    MyProfileComponent.prototype.enableLink = function (link) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(link);
    };
    MyProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-my-profile',
            template: __webpack_require__(695),
            styles: [__webpack_require__(682)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _c) || Object])
    ], MyProfileComponent);
    return MyProfileComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/my-profile.component.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PostComponent = (function () {
    function PostComponent(postsService, authService, activatedRoute, router, formBuilder, location, domSanitizer) {
        this.postsService = postsService;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.formBuilder = formBuilder;
        this.location = location;
        this.domSanitizer = domSanitizer;
        this.found = false;
        this.processing = false;
        this.commentsBool = false;
        this.form = this.formBuilder.group({
            comment: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* Validators */].maxLength(700)
                ])]
        });
    }
    PostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.postsService.readPost(this.currentUrl.id).subscribe(function (post) {
            if (!post.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = post.message;
            }
            else {
                _this.found = true;
                _this.post = post.post[0];
                _this.comments = post.post[0].comments.reverse();
                if (_this.comments[0]) {
                    _this.commentsBool = true;
                }
            }
        });
        this.authService.getProfile().subscribe(function (profile) {
            _this.username = profile.user.username;
        });
    };
    PostComponent.prototype.back = function () {
        this.location.back();
    };
    PostComponent.prototype.newComment = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        var comment = {
            id: this.currentUrl.id,
            comment: this.form.get('comment').value.trim()
        };
        this.postsService.newComment(comment).subscribe(function (data) {
            _this.processing = true;
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
                _this.processing = false;
            }
            else {
                _this.messageClass = false;
                _this.message = false;
                _this.comments.unshift({
                    commentAuthor: _this.username,
                    comment: comment.comment,
                    date: new Date()
                });
                _this.commentsBool = true;
                setTimeout(function () {
                    _this.processing = false;
                }, 2000);
            }
        });
    };
    PostComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-post',
            template: __webpack_require__(697),
            styles: [__webpack_require__(684)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_posts_service__["a" /* PostsService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormBuilder */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* Location */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _g) || Object])
    ], PostComponent);
    return PostComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/post.component.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = (function () {
    function ProfileComponent(activatedRoute, postsService, domSanitizer, authService, router) {
        this.activatedRoute = activatedRoute;
        this.postsService = postsService;
        this.domSanitizer = domSanitizer;
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.username = this.currentUrl.user;
        this.authService.getProfile().subscribe(function (profile) {
            if (profile.user.username === _this.username) {
                _this.router.navigate(['/myprofile']);
            }
        });
        this.postsService.getAllPostsBy(this.username).subscribe(function (posts) {
            if (!posts.success) {
            }
            else {
                _this.posts = posts.message.reverse();
                _this.postsNumber = posts.message.length;
            }
        });
    };
    ProfileComponent.prototype.enableLink = function (link) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(link);
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(698),
            styles: [__webpack_require__(685)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _e) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/profile.component.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(62);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DeleteComponent = (function () {
    function DeleteComponent(postsService, activatedRoute, router, location) {
        this.postsService = postsService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.location = location;
        this.found = false;
        this.processing = false;
    }
    DeleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.postsService.getPost(this.currentUrl.id).subscribe(function (post) {
            if (!post.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = post.message;
            }
            else {
                _this.found = true;
                _this.post = post.post[0];
                console.log(_this.post);
            }
        });
    };
    DeleteComponent.prototype.deletePost = function () {
        var _this = this;
        this.processing = true;
        this.postsService.deletePost(this.currentUrl.id).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
            }
            else {
                _this.messageClass = 'alert alert-success';
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/dashboard']);
                }, 1000);
            }
        });
    };
    DeleteComponent.prototype.back = function () {
        this.location.back();
    };
    DeleteComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-delete',
            template: __webpack_require__(699),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_posts_service__["a" /* PostsService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */]) === 'function' && _d) || Object])
    ], DeleteComponent);
    return DeleteComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/delete.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(62);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditComponent = (function () {
    function EditComponent(activatedRoute, postsService, router, location) {
        this.activatedRoute = activatedRoute;
        this.postsService = postsService;
        this.router = router;
        this.location = location;
        this.processing = false;
        this.display = false;
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.postsService.getPost(this.currentUrl.id).subscribe(function (post) {
            if (!post.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = post.message;
            }
            else {
                _this.display = true;
                _this.post = post.post[0];
            }
        });
    };
    EditComponent.prototype.updatePost = function () {
        var _this = this;
        this.processing = true;
        this.postsService.updatePost(this.post).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
                _this.processing = false;
            }
            else {
                _this.messageClass = 'alert alert-success';
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/dashboard']);
                }, 1000);
            }
        });
    };
    EditComponent.prototype.back = function () {
        this.location.back();
    };
    EditComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit',
            template: __webpack_require__(700),
            styles: [__webpack_require__(687)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_posts_service__["a" /* PostsService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* Location */]) === 'function' && _d) || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/edit.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublishComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PublishComponent = (function () {
    function PublishComponent(formBuilder, authService, postsService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.postsService = postsService;
        this.router = router;
        this.processing = false;
        this.videos = '';
        this.q = '';
        this.form = this.formBuilder.group({
            link: '',
            body: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].maxLength(600)
                ])]
        });
    }
    PublishComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.username = profile.user.username;
        });
    };
    PublishComponent.prototype.getVideos = function () {
        var _this = this;
        this.postsService.searchVideo(this.q).subscribe(function (data) {
            _this.videos = data.items;
        });
    };
    PublishComponent.prototype.choseVideo = function (video) {
        this.link = 'https://www.youtube.com/embed/' + video.id;
        this.linkTitle = video.title;
        this.form.setValue({ link: '', body: this.form.get('body').value });
    };
    PublishComponent.prototype.newPost = function () {
        var _this = this;
        this.processing = true;
        var post = {
            link: this.link,
            body: this.form.get('body').value.trim(),
            author: this.username
        };
        this.postsService.newPost(post).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
                _this.processing = false;
            }
            else {
                _this.messageClass = 'alert alert-success';
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/post', data.id]);
                }, 1000);
            }
        });
    };
    PublishComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-publish',
            template: __webpack_require__(701),
            styles: [__webpack_require__(688)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_posts_service__["a" /* PostsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_posts_service__["a" /* PostsService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], PublishComponent);
    return PublishComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/publish.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.processing = false;
        this.form = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(3),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(25)
                ])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(30),
                    this.validateEmail
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].minLength(8),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].maxLength(30)
                ])],
            confirm: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required]
        }, { validator: this.validatePasswords('password', 'confirm') });
    }
    RegisterComponent.prototype.validateEmail = function (controls) {
        var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(controls.value)) {
            return null;
        }
        else {
            return { 'validateEmail': true };
        }
    };
    RegisterComponent.prototype.validatePasswords = function (password, confirm) {
        return function (group) {
            if (group.controls[password].value === group.controls[confirm].value) {
                return null;
            }
            else {
                return { 'validatePasswords': true };
            }
        };
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        this.processing = true;
        var user = {
            username: this.form.get('username').value.trim(),
            email: this.form.get('email').value.trim(),
            password: this.form.get('password').value.trim()
        };
        this.authService.register(user).subscribe(function (data) {
            if (!data.success) {
                _this.processing = false;
                _this.messageClass = "alert alert-danger";
                _this.message = data.message;
            }
            else {
                _this.messageClass = "alert alert-success";
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(['/login']);
                }, 1000);
            }
        });
    };
    RegisterComponent.prototype.checkUsername = function () {
        var _this = this;
        var username = this.form.get('username').value.toLowerCase();
        this.authService.checkUsername(username).subscribe(function (data) {
            if (!data.success) {
                _this.usernameMessage = data.message;
            }
            else {
                _this.usernameMessage = false;
            }
        });
    };
    RegisterComponent.prototype.checkEmail = function () {
        var _this = this;
        var email = this.form.get('email').value.toLowerCase();
        this.authService.checkEmail(email).subscribe(function (data) {
            if (!data.success) {
                _this.emailMessage = data.message;
            }
            else {
                _this.emailMessage = false;
            }
        });
    };
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(702),
            styles: [__webpack_require__(689)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/register.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/auth.guard.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotAuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotAuthGuard = (function () {
    function NotAuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NotAuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        else {
            return true;
        }
    };
    NotAuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], NotAuthGuard);
    return NotAuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/not-auth.guard.js.map

/***/ }),

/***/ 400:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 400;


/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(519);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/main.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_register_register_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_login_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_my_profile_my_profile_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_profile_profile_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_dashboard_dashboard_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_publish_publish_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_publish_edit_edit_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_publish_delete_delete_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_post_post_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__guards_not_auth_guard__ = __webpack_require__(345);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var appRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'signup',
        component: __WEBPACK_IMPORTED_MODULE_3__components_register_register_component__["a" /* RegisterComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_not_auth_guard__["a" /* NotAuthGuard */]]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_4__components_login_login_component__["a" /* LoginComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_not_auth_guard__["a" /* NotAuthGuard */]]
    },
    {
        path: 'myprofile',
        component: __WEBPACK_IMPORTED_MODULE_5__components_my_profile_my_profile_component__["a" /* MyProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'profile/:user',
        component: __WEBPACK_IMPORTED_MODULE_6__components_profile_profile_component__["a" /* ProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_7__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'publish',
        component: __WEBPACK_IMPORTED_MODULE_8__components_publish_publish_component__["a" /* PublishComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'edit_post/:id',
        component: __WEBPACK_IMPORTED_MODULE_9__components_publish_edit_edit_component__["a" /* EditComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'delete_post/:id',
        component: __WEBPACK_IMPORTED_MODULE_10__components_publish_delete_delete_component__["a" /* DeleteComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'post/:id',
        component: __WEBPACK_IMPORTED_MODULE_11__components_post_post_component__["a" /* PostComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_auth_guard__["a" /* AuthGuard */]]
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_2__components_home_home_component__["a" /* HomeComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes)],
            providers: [],
            bootstrap: [],
            exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/app-routing.module.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(691),
            styles: [__webpack_require__(678)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/app.component.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_navbar_navbar_component__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_home_home_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_posts_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_my_profile_my_profile_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__guards_auth_guard__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__guards_not_auth_guard__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_publish_publish_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_dashboard_dashboard_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_publish_edit_edit_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_publish_delete_delete_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_post_post_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_profile_profile_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_video_video_component__ = __webpack_require__(521);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_my_profile_my_profile_component__["a" /* MyProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_publish_publish_component__["a" /* PublishComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_publish_edit_edit_component__["a" /* EditComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_publish_delete_delete_component__["a" /* DeleteComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_post_post_component__["a" /* PostComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_video_video_component__["a" /* VideoComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_10__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_13__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_14__guards_not_auth_guard__["a" /* NotAuthGuard */],
                __WEBPACK_IMPORTED_MODULE_11__services_posts_service__["a" /* PostsService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/app.module.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = (function () {
    function NavbarComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    NavbarComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/']);
    };
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(696),
            styles: [__webpack_require__(683)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/navbar.component.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VideoComponent = (function () {
    function VideoComponent(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    VideoComponent.prototype.ngOnInit = function () {
    };
    VideoComponent.prototype.enableLink = function (link) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(link);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], VideoComponent.prototype, "video", void 0);
    VideoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-video',
            template: __webpack_require__(703),
            styles: [__webpack_require__(690)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _a) || Object])
    ], VideoComponent);
    return VideoComponent;
    var _a;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/video.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    domain: "http://localhost:8080/"
};
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/environment.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostsService = (function () {
    function PostsService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.domain = this.authService.domain;
    }
    PostsService.prototype.createAuthenticationHeaders = function () {
        this.authService.authToken = localStorage.getItem('token');
        this.header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
                'Content-Type': 'application/json',
                'authorisation': this.authService.authToken
            })
        });
    };
    PostsService.prototype.newPost = function (post) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'posts/newpost', post, this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.searchVideo = function (q) {
        return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyArgaoqh4M7Z9DiYD_GUmB4E5UEvyerFAs&q=' + q).map(function (res) { return res.json(); });
    };
    PostsService.prototype.getAllPosts = function () {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'posts/getposts', this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.getAllPostsBy = function (username) {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'posts/getallby/' + username, this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.getPost = function (id) {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'posts/getpost/' + id, this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.updatePost = function (post) {
        this.createAuthenticationHeaders();
        return this.http.put(this.domain + 'posts/updatepost/', post, this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.deletePost = function (id) {
        this.createAuthenticationHeaders();
        return this.http.delete(this.domain + 'posts/deletepost/' + id, this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.readPost = function (id) {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'posts/readpost/' + id, this.header).map(function (res) { return res.json(); });
    };
    PostsService.prototype.newComment = function (comment) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'posts/comment/', comment, this.header).map(function (res) { return res.json(); });
    };
    PostsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _b) || Object])
    ], PostsService);
    return PostsService;
    var _a, _b;
}());
//# sourceMappingURL=D:/Programowanie/yt-app/client/src/posts.service.js.map

/***/ }),

/***/ 678:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

module.exports = ".panel {\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.author {\r\n\tfont-weight: bold\r\n}\r\n"

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = ".jumbotron {\r\n\tbackground: #eaeaea;\r\n\tborder-radius: 15px;\r\n}\r\n\r\n.btn-secondary {\r\n\tborder: 1px solid grey;\r\n}"

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = ".alert {\r\n\twidth: 97%;\r\n}"

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = ".page-header {\r\n\tmargin-top: 0px;\r\n}\r\n\r\n.panel, ul {\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.author {\r\n\tfont-weight: bold\r\n}"

/***/ }),

/***/ 683:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = ".panel {\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.author {\r\n\tfont-weight: bold\r\n}\r\n\r\n.alert {\r\n\twidth: 97%;\r\n}\r\n\r\n.jumbotron {\r\n\tpadding: 10px;\r\n\tborder: 1px solid grey;\r\n}\r\n\r\na {\r\n\tcolor: black;\r\n}\r\n\r\n.hidden-sm {\r\n\tmargin-left: -10px;\r\n}"

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = ".page-header {\r\n\tmargin-top: 0px;\r\n}\r\n\r\n.panel, ul {\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.author {\r\n\tfont-weight: bold\r\n}"

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = ".alert {\r\n\twidth: 97%;\r\n\tmargin-left: auto;\r\n\tmargin-right: auto;\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.jumbotron {\r\n\tpadding-top: 10px;\r\n\tpadding-bottom: 10px;\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.page-header {\r\n\tmargin-top: 0px;\r\n}"

/***/ }),

/***/ 687:
/***/ (function(module, exports) {

module.exports = ".page-header {\r\n\tmargin-top: 0px;\r\n}\r\n\r\n.alert {\r\n\twidth: 97%;\r\n}"

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = "body {\r\n\tmargin: 0;\r\n}\r\n\r\n.alert {\r\n\twidth: 97%;\r\n\tmargin-left: auto;\r\n\tmargin-right: auto;\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.jumbotron {\r\n\tpadding-top: 10px;\r\n\tpadding-bottom: 10px;\r\n\tborder: 1px solid grey;\r\n}\r\n\r\n.page-header {\r\n\tmargin-top: 0px;\r\n}\r\n\r\n.video-md {\r\n\theight: 190px\r\n}\r\n\r\n.video-sm {\r\n\theight: 120px\r\n}\r\n\r\n.video-md img {\r\n\tpadding: 5px\r\n}\r\n\r\n.video-sm img {\r\n\tpadding: 5px\r\n}\r\n\r\nh4, h5 {\r\n\tpadding-top: 5px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.videoClick {\r\n\tcursor: pointer;\r\n\tmargin-top: -12px;\r\n}\r\n\r\nlabel {\r\n\tfont-size: 14px;\r\n}"

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = ".alert {\r\n\twidth: 97%;\r\n}"

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\" *ngFor=\"let post of postsArray\">\r\n\t<div class=\"panel-heading\">\r\n\t\t<div class=\"panel-title pull-left author\"><a [routerLink]=\"['/profile', post.author]\">{{ post.author }}</a></div>\r\n        <div class=\"panel-title pull-right hidden-xs\">{{ post.date | date:'dd.MM.yyyy' }}</div>\r\n        <div class=\"clearfix\"></div>\r\n        <p class=\"hidden-sm hidden-md hidden-lg\">{{ post.date | date:'dd.mm.yyyy' }}</p>  \r\n\t</div>\r\n\t<div class=\"panel-body\">\r\n\t<app-video [video]=\"post.link\"></app-video>\r\n\t{{ post.body }}\r\n\t</div>\r\n\t<div class=\"panel-footer\">\r\n\t\t<a [routerLink]=\"['/post', post._id]\"><button class=\"btn btn-primary btn-sm\">Comments</button></a>\r\n\t\t<a [routerLink]=\"['/edit_post', post._id]\" *ngIf=\"this.username === post.author\"><button class=\"btn btn-warning btn-sm\">Edit</button></a>\r\n\t\t<a [routerLink]=\"['/delete_post', post._id]\" *ngIf=\"this.username === post.author\"><button class=\"btn btn-danger btn-sm\">Delete</button></a>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\" align=\"center\">\r\n\t<h1>Youtube App\r\n\t<br>\r\n\t<small>by <a href=\"https://github.com/RGladys/\">Radoslaw Gladys</a></small>\r\n\t</h1>\r\n\t<br>\r\n\t<button routerLink=\"/login\" class=\"btn btn-primary btn-md\" *ngIf=\"!authService.loggedIn()\">Login</button>\r\n\t<button routerLink=\"/signup\" class=\"btn btn-secondary btn-md\" *ngIf=\"!authService.loggedIn()\">Register</button>\r\n\t<h3 class=\"text-primary\">Social app made with MongoDB, Express.js, Angular2 and Node.js.</h3>\r\n\t<h4>Share the videos and find out what posted others!</h4>\r\n</div>"

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<h2>Sign Up<br><small class=\"hidden-xs\">Don't have an account? <a routerLink=\"/signup\">Register</a>!</small></h2>\r\n\r\n<br class=\"hidden-xs\">\r\n\r\n<div class=\"row show-hide-message\" align=\"center\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{ message }}\r\n  </div>\r\n</div>\r\n\r\n<form [formGroup]=\"form\" (submit)=\"onLoginSumbit()\">\r\n  <br>\r\n  <div class=\"form-group\">\r\n    <label>Username:</label>\r\n    <input type=\"text\" class=\"form-control\" name=\"username\" formControlName=\"username\">\r\n    <ul class=\"help-block\">\r\n      <li *ngIf=\"form.controls.username.errors?.required && form.controls.username.dirty\" class=\"text-danger\">Username is required.</li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Password:</label>\r\n    <input type=\"password\" class=\"form-control\" name=\"password\" formControlName=\"password\" autocomplete=\"off\">\r\n    <ul class=\"help-block\">\r\n      <li *ngIf=\"form.controls.password.errors?.required && form.controls.password.dirty\" class=\"text-danger\">Password is required.</li>\r\n    </ul>\r\n  </div>\r\n  <button type=\"submit\" [disabled]=\"!form.valid || processing\" class=\"btn btn-primary hidden-xs\">Login</button>\r\n  <button type=\"submit\" [disabled]=\"!form.valid || processing\" class=\"btn btn-primary btn-block hidden-sm hidden-md hidden-lg\">Login</button>\r\n  <p class=\"text-info text-center hidden-sm hidden-md hidden-lg\">Don't have an account? <a routerLink=\"/signup\">Register</a>!</p>\r\n</form>"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-header\">Profile Page</h1>\r\n<ul class=\"list-group\">\r\n  <li class=\"list-group-item\">Username: {{ username }}</li>\r\n  <li class=\"list-group-item\">Email: {{ email }}</li>\r\n  <li class=\"list-group-item\">Posts: {{ postsNumber }}</li>\r\n</ul>\r\n\r\n<h3 class=\"page-header\">Posts by {{ username }}:</h3>\r\n\r\n<div class=\"panel panel-default\" *ngFor=\"let post of posts\">\r\n\t<div class=\"panel-heading\">\r\n\t\t<div class=\"panel-title pull-left author\">{{ post.author }}</div>\r\n        <div class=\"panel-title pull-right hidden-xs\">{{ post.date | date:'dd.MM.yyyy' }}</div>\r\n        <div class=\"clearfix\"></div>\r\n        <p class=\"hidden-sm hidden-md hidden-lg\">{{ post.date | date:'dd.mm.yyyy' }}</p>  \r\n\t</div>\r\n\t<div class=\"panel-body\">\r\n\t<app-video [video]=\"post.link\"></app-video>\r\n\t{{ post.body }}</div>\r\n\t<div class=\"panel-footer\">\r\n\t\t<a [routerLink]=\"['/post', post._id]\"><button class=\"btn btn-primary btn-sm\">Comments</button></a>\r\n\t\t<a [routerLink]=\"['/edit_post', post._id]\"><button class=\"btn btn-warning btn-sm\">Edit</button></a>\r\n\t\t<a [routerLink]=\"['/delete_post', post._id]\"><button class=\"btn btn-danger btn-sm\">Delete</button></a>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<div class=container>\r\n<nav class=\"navbar navbar-default\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"navbar-header\">\r\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>                        \r\n      </button>\r\n      <a class=\"navbar-brand\" routerLink=\"/\">Youtube App</a>\r\n    </div>\r\n    <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\r\n      <ul class=\"nav navbar-nav navbar-left\">\r\n        <li *ngIf=\"authService.loggedIn()\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n        <li *ngIf=\"authService.loggedIn()\"><a routerLink=\"/publish\">Publish</a></li>\r\n      </ul>\r\n      <ul class=\"nav navbar-nav navbar-right\">\r\n        <li *ngIf=\"authService.loggedIn()\"><a routerLink=\"/myprofile\">Profile</a></li>\r\n        <li *ngIf=\"authService.loggedIn()\"><a href=\"#\" (click)=\"onLogout()\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li>\r\n        <li><a routerLink=\"/login\" *ngIf=\"!authService.loggedIn()\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\r\n        <li><a routerLink=\"/signup\" *ngIf=\"!authService.loggedIn()\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</nav>\r\n</div>"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\" *ngIf=\"found\">\r\n\t<div class=\"panel-heading\">\r\n\t\t<div class=\"panel-title pull-left author\"><a [routerLink]=\"['/profile', post.author]\">{{ post.author }}</a></div>\r\n        <div class=\"panel-title pull-right hidden-xs\">{{ post.date | date:'dd.MM.yyyy' }}</div>\r\n        <div class=\"clearfix\"></div>\r\n        <p class=\"hidden-sm hidden-md hidden-lg\">{{ post.date | date:'dd.mm.yyyy' }}</p>  \r\n\t</div>\r\n\t<div class=\"panel-body\">\r\n  <app-video [video]=\"post.link\"></app-video>\r\n  {{ post.body }}</div>\r\n  <div class=\"panel-footer\">\r\n    <a [routerLink]=\"['/edit_post', post._id]\" *ngIf=\"this.username === post.author\"><button class=\"btn btn-warning btn-sm\">Edit</button></a>\r\n    <a [routerLink]=\"['/delete_post', post._id]\" *ngIf=\"this.username === post.author\"><button class=\"btn btn-danger btn-sm\">Delete</button></a>\r\n    <button (click)=\"back()\" class=\"btn btn-primary btn-sm\">Back</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row show-hide-message\" align=\"center\" *ngIf=\"message\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{ message }}\r\n  </div>\r\n</div>\r\n\r\n<div class=\"jumbotron\" *ngIf=\"found\">\r\n<form [formGroup]=\"form\" (submit)=\"newComment()\">\r\n\t<textarea name=\"comment\" rows=\"5\" cols=\"20\" class=\"form-control\" placeholder=\"Add comment...\" formControlName=\"comment\" resize=\"none\"></textarea>\r\n\t<ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.comment.dirty && form.controls.comment.errors?.required\">This field is required.</li>\r\n        <li *ngIf=\"form.controls.comment.dirty && form.controls.comment.errors?.minlength || form.controls.comment.errors?.maxlength\">Comment must containt at least 10 character, but no more than 700. </li>\r\n    </ul>\r\n\t<button [disabled]=\"this.processing\" type=\"submit\" class=\"btn btn-sm btn-primary\">Submit</button>\r\n</form>\r\n</div>\r\n\r\n<h3 class=\"page-header\" *ngIf=\"found\">Comments:</h3>\r\n<ul class=\"list-group\" *ngFor=\"let comment of comments\">\r\n  <li class=\"list-group-item\"><h5 class=\"text-bold\"><strong><a [routerLink]=\"['/profile', comment.commentAuthor]\">{{ comment.commentAuthor }}</a></strong>   {{ comment.date | date: 'dd.MM.yyyy' }}</h5>\r\n  <h5>{{ comment.comment }}</h5>\r\n  </li>\r\n</ul> \r\n<h5 *ngIf=\"!commentsBool && found\">Post wasn't commented yet.</h5>"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-header\">{{ username }}</h1>\r\n\r\n<h3 class=\"page-header\">{{ postsNumber }} posts by {{ username }}:</h3>\r\n\r\n<div class=\"panel panel-default\" *ngFor=\"let post of posts\">\r\n\t<div class=\"panel-heading\">\r\n\t\t<div class=\"panel-title pull-left author\">{{ post.author }}</div>\r\n        <div class=\"panel-title pull-right hidden-xs\">{{ post.date | date:'dd.MM.yyyy' }}</div>\r\n        <div class=\"clearfix\"></div>\r\n        <p class=\"hidden-sm hidden-md hidden-lg\">{{ post.date | date:'dd.mm.yyyy' }}</p>  \r\n\t</div>\r\n\t<div class=\"panel-body\">\r\n\t<app-video [video]=\"post.link\"></app-video>\r\n\t{{ post.body }}</div>\r\n\t<div class=\"panel-footer\">\r\n\t\t<a [routerLink]=\"['/post', post._id]\"><button class=\"btn btn-primary btn-sm\">Comments</button></a>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-header\">Delete Blog</h1>\r\n\r\n<div class=\"row show-hide-message\" *ngIf=\"message\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{ message }}\r\n  </div>\r\n</div>\r\n\r\n<div class=\"col-md-6\" *ngIf=\"this.found\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <button type=\"button\" name=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n      <h4 class=\"modal-title\">Confirm</h4>\r\n    </div>\r\n\r\n    <div class=\"modal-body\">\r\n      <p>Are you sure you would like to delete this post?</p>\r\n    </div>\r\n\r\n    <div class=\"modal-footer\">\r\n      <button [disabled]=\"processing\" type=\"button\" name=\"button\" class=\"btn btn-success\" (click)=\"deletePost()\">Yes</button>\r\n      <button (click)=\"back()\" [disabled]=\"processing\" type=\"button\" name=\"button\" class=\"btn btn-secondary\">No</button>\r\n    </div>\r\n  </div>\r\n\r\n  <br />\r\n\r\n  <div class=\"panel panel-primary\">\r\n    <div class=\"panel-heading\">\r\n      <strong>Posted by: </strong> {{ post.author }}\r\n      <br />\r\n      <strong>Date: </strong> {{ post.date | date:'MMM dd, yyyy' }}\r\n    </div>\r\n\r\n    <div class=\"panel-body\">\r\n      {{ post.body }}\r\n    </div>\r\n\r\n\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-header\">Edit Blog</h1>\r\n\r\n<div class=\"row show-hide-message\" align=\"center\" *ngIf=\"message\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{ message }}\r\n  </div>\r\n</div>\r\n\r\n<form *ngIf=\"this.display\">\r\n  <div class=\"form-group\">\r\n    <label for=\"body\">Post</label>\r\n      <textarea name=\"body\" rows=\"4\" cols=\"80\" placeholder=\"Write something...\" class=\"form-control\" [(ngModel)]=\"this.post.body\"></textarea>\r\n    </div>\r\n<button [disabled]=\"this.processing\" class=\"btn btn-primary\" type=\"submit\" (click)=\"updatePost()\">Save</button>\r\n<a ><button [routerLink]=\"['/delete_post', post._id]\" [disabled]=\"this.processing\" class=\"btn btn-primary\">Delete post</button></a>\r\n<button (click)=\"back()\" [disabled]=\"processing\" type=\"button\" name=\"button\" class=\"btn btn-secondary\">Back</button>\r\n</form>"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-header\">Create new post</h1>\r\n<div class=\"jumbotron\">\r\n\r\n<div class=\"row show-hide-message\" *ngIf=\"message && newPost\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{ message }}\r\n  </div>\r\n</div>\r\n\r\n<form [formGroup]=\"form\" (submit)=\"newPost()\">\r\n  <div class=\"form-group\">\r\n    <label for=\"body\"><strong>Post</strong></label>\r\n      <textarea name=\"body\" rows=\"4\" cols=\"80\" placeholder=\"Write something...\" class=\"form-control\" formControlName=\"body\"></textarea>\r\n      <ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.body.dirty && form.controls.body.errors?.required\">This field is required.</li>\r\n        <li *ngIf=\"form.controls.body.dirty && form.controls.body.errors?.minlength || form.controls.body.errors?.maxlength\">Post must containt at least 5 character, but no more than 600. </li>\r\n      </ul>\r\n    </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"Link\"><strong>Video</strong><span>: {{ linkTitle }}</span> </label>\r\n      <input type=\"text\" name=\"link\" class=\"form-control\" placeholder=\"Youtube Link\" autocomplete=\"off\" formControlName=\"link\" \r\n      (keyup)=\"getVideos()\" [(ngModel)]=\"q\"/>\r\n      <br>\r\n      <button [disabled]=\"this.processing\" class=\"btn btn-primary\">Publish</button>\r\n      <br><br>\r\n\r\n        <div *ngIf=\"videos && q\">\r\n            <!-- Larger size -->\r\n            <div class=\"panel panel-default video-md hidden-xs\" *ngFor=\"let video of videos\">\r\n              <div class=\"videoClick\" (click)=\"choseVideo({id: video.id.videoId, title: video.snippet.title})\">\r\n                <img class=\"pull-left\" src=\"{{ video.snippet.thumbnails.medium.url }}\">              \r\n                <h4>{{ video.snippet.title }}</h4>\r\n                <h5 class=\"hidden-xs\">{{ video.snippet.description }}</h5>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Small size -->\r\n            <div class=\"panel panel-default video-sm hidden-sm hidden-md hidden-lg\" *ngFor=\"let video of videos\">\r\n              <div class=\"videoClick\" (click)=\"choseVideo({id: video.id.videoId, title: video.snippet.title})\">\r\n                <img class=\"pull-left\" src=\"{{ video.snippet.thumbnails.default.url }}\">\r\n                <h5>{{ video.snippet.title }}</h5>\r\n              </div>\r\n            </div>\r\n        </div>\r\n  </div>\r\n\r\n</form>\r\n\r\n</div>"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<h2>Sign Up<br><small class=\"hidden-xs\">In order to use the site you have to create an account.</small></h2>\r\n<p class=\"text-info hidden-sm hidden-md hidden-lg\">In order to use the site you have to create an account.</p>\r\n<br class=\"hidden-xs\">\r\n\r\n<div class=\"row show-hide-message\" align=\"center\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{ message }}\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n <form [formGroup]=\"form\" (submit)=\"onRegisterSubmit()\">\r\n  <div class=\"form-group\">\r\n    <label>Username:</label>\r\n    <input type=\"text\" class=\"form-control\" name=\"username\" formControlName=\"username\" autocomplete=\"off\" (keyup)=\"this.checkUsername()\">\r\n    <ul class=\"help-block\">\r\n      <li *ngIf=\"form.controls.username.errors?.required && form.controls.username.dirty\" class=\"text-danger\">Username is required.</li>\r\n      <li *ngIf=\"form.controls.username.errors?.minlength && form.controls.username.dirty\" class=\"text-danger\">Username must be at least 3 characters long.</li>\r\n      <li *ngIf=\"form.controls.username.errors?.maxlength && form.controls.username.dirty\" class=\"text-danger\">Username can't containt more than 25 characters.</li>\r\n      <li *ngIf=\"this.usernameMessage\">{{ this.usernameMessage }}</li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Email address:</label>\r\n    <input class=\"form-control\" id=\"email\" name=\"email\" formControlName=\"email\" autocomplete=\"off\" (keyup)=\"this.checkEmail()\">\r\n    <ul  class=\"help-block\">\r\n      <li *ngIf=\"form.controls.email.errors?.required && form.controls.email.dirty\" class=\"text-danger\">Email is required.</li>\r\n      <li *ngIf=\"form.controls.email.errors?.minlength && form.controls.email.dirty\" class=\"text-danger\">Email must be at least 5 characters long.</li>\r\n      <li *ngIf=\"form.controls.email.errors?.maxlength && form.controls.email.dirty\" class=\"text-danger\">Email can't containt more than 30 characters.</li>\r\n      <li *ngIf=\"form.controls.email.errors?.validateEmail && form.controls.email.dirty\" class=\"text-danger\">You have to enter an email adress.</li>\r\n      <li *ngIf=\"this.emailMessage\">{{ this.emailMessage }}</li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Password:</label>\r\n    <input type=\"password\" class=\"form-control\" name=\"password\" formControlName=\"password\" autocomplete=\"off\">\r\n    <ul class=\"help-block\">\r\n      <li *ngIf=\"form.controls.password.errors?.required && form.controls.password.dirty\" class=\"text-danger\">Password is required.</li>\r\n      <li *ngIf=\"form.controls.password.errors?.minlength && form.controls.password.dirty\" class=\"text-danger\">Password must be at least 8 characters long.</li>\r\n      <li *ngIf=\"form.controls.password.errors?.maxlength && form.controls.password.dirty\" class=\"text-danger\">Password can't containt more than 30 characters.</li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Confirm password:</label>\r\n    <input type=\"password\" class=\"form-control\" name=\"confirm\" formControlName=\"confirm\" autocomplete=\"off\">\r\n    <ul class=\"help-block\">\r\n      <li *ngIf=\"form.controls.confirm.errors?.required && form.controls.confirm.dirty\" class=\"text-danger\">You have to confirm a password.</li>\r\n      <li *ngIf=\"form.errors?.validatePasswords && form.controls.confirm.dirty\" class=\"text-danger\">Passwords do not match</li>\r\n    </ul>\r\n  </div>\r\n  <button type=\"submit\" [disabled]=\"!form.valid || processing || usernameMessage\" class=\"btn btn-primary hidden-xs\">Sign Up</button>\r\n  <button type=\"submit\" [disabled]=\"!form.valid || processing || emailMessage\" class=\"btn btn-primary btn-block hidden-sm hidden-md hidden-lg\">Sign Up</button>\r\n</form> "

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "<iframe width=\"400\" height=\"300\" [src]=\"this.enableLink(video)\" frameborder=\"0\" class=\"hidden-xs\"></iframe>\n<iframe width=\"250\" height=\"200\" [src]=\"this.enableLink(video)\" class=\"hidden-sm hidden-md hidden-lg\"></iframe> \n"

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(401);


/***/ })

},[727]);
//# sourceMappingURL=main.bundle.map