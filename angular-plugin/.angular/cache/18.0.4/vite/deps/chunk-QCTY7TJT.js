import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  init_tslib_es6,
  tslib_es6_exports
} from "./chunk-L35DB5L5.js";

// node_modules/@remixproject/plugin/src/lib/api.js
var require_api = __commonJS({
  "node_modules/@remixproject/plugin/src/lib/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getApiMap = exports.createApi = void 0;
    function createApi(client, profile) {
      if (typeof profile.name !== "string") {
        throw new Error("Profile should have a name");
      }
      const on = (event, cb) => {
        client.on.call(client, profile.name, event, cb);
      };
      const methods = (profile.methods || []).reduce((acc, method) => Object.assign(Object.assign({}, acc), { [method]: client.call.bind(client, profile.name, method) }), {});
      return Object.assign({ on }, methods);
    }
    exports.createApi = createApi;
    function getApiMap(client, profiles) {
      return Object.keys(profiles).reduce((acc, name) => {
        const profile = profiles[name];
        return Object.assign(Object.assign({}, acc), { [name]: createApi(client, profile) });
      }, {});
    }
    exports.getApiMap = getApiMap;
  }
});

// node_modules/@remixproject/plugin/node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/@remixproject/plugin/node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function eventListener() {
          if (errorListener !== void 0) {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        var errorListener;
        if (name !== "error") {
          errorListener = function errorListener2(err) {
            emitter.removeListener(name, eventListener);
            reject(err);
          };
          emitter.once("error", errorListener);
        }
        emitter.once(name, eventListener);
      });
    }
  }
});

// node_modules/@remixproject/plugin-api/src/lib/compiler/api.js
var require_api2 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/compiler/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/compiler/type/input.js
var require_input = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/compiler/type/input.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/compiler/type/output.js
var require_output = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/compiler/type/output.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/compiler/type/index.js
var require_type = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/compiler/type/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_input(), exports);
    tslib_1.__exportStar(require_output(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/compiler/profile.js
var require_profile = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/compiler/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compilerProfile = void 0;
    exports.compilerProfile = {
      name: "solidity",
      methods: ["compile", "getCompilationResult", "compileWithParameters", "setCompilerConfig"],
      events: ["compilationFinished"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/compiler/index.js
var require_compiler = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/compiler/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api2(), exports);
    tslib_1.__exportStar(require_type(), exports);
    tslib_1.__exportStar(require_profile(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/content-import/api.js
var require_api3 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/content-import/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/content-import/type.js
var require_type2 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/content-import/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/content-import/profile.js
var require_profile2 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/content-import/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentImportProfile = void 0;
    exports.contentImportProfile = {
      name: "contentImport",
      methods: ["resolve", "resolveAndSave"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/content-import/index.js
var require_content_import = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/content-import/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api3(), exports);
    tslib_1.__exportStar(require_type2(), exports);
    tslib_1.__exportStar(require_profile2(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/editor/type.js
var require_type3 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/editor/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/editor/api.js
var require_api4 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/editor/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/editor/profile.js
var require_profile3 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/editor/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.editorProfile = void 0;
    exports.editorProfile = {
      name: "editor",
      methods: ["discardHighlight", "highlight", "addAnnotation", "clearAnnotations", "discardHighlightAt", "gotoLine"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/editor/index.js
var require_editor = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/editor/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_type3(), exports);
    tslib_1.__exportStar(require_api4(), exports);
    tslib_1.__exportStar(require_profile3(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/api.js
var require_api5 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/type.js
var require_type4 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/profile.js
var require_profile4 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filSystemProfile = void 0;
    exports.filSystemProfile = {
      name: "fileManager",
      displayName: "Native Filemanager for Remix vscode plugin",
      description: "Provides communication between vscode filemanager and remix-plugin",
      location: "sidePanel",
      documentation: "https://remix-ide.readthedocs.io/en/latest/solidity_editor.html",
      version: "0.0.1",
      methods: [
        "getFolder",
        "getCurrentFile",
        "getFile",
        "setFile",
        "switchFile",
        // NextFileSystemAPI
        "open",
        "writeFile",
        "readFile",
        "rename",
        "copyFile",
        "mkdir",
        "readdir",
        "closeAllFiles",
        "closeFile",
        "remove"
      ],
      events: ["currentFileChanged", "fileAdded", "fileClosed", "fileRemoved", "fileRenamed", "fileSaved", "noFileSelected", "folderAdded"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/index.js
var require_file_manager = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-manager/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api5(), exports);
    tslib_1.__exportStar(require_type4(), exports);
    tslib_1.__exportStar(require_profile4(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/api.js
var require_api6 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/profile.js
var require_profile5 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filePanelProfile = void 0;
    exports.filePanelProfile = {
      name: "filePanel",
      displayName: "File explorers",
      description: "Provides communication between remix file explorers and remix-plugin",
      location: "sidePanel",
      documentation: "",
      version: "0.0.1",
      methods: ["getCurrentWorkspace", "getWorkspaces", "createWorkspace", "registerContextMenuItem", "renameWorkspace", "deleteWorkspace"],
      events: ["setWorkspace", "workspaceRenamed", "workspaceDeleted", "workspaceCreated"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/type.js
var require_type5 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/index.js
var require_file_panel = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/file-system/file-panel/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api6(), exports);
    tslib_1.__exportStar(require_profile5(), exports);
    tslib_1.__exportStar(require_type5(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/dgit/api.js
var require_api7 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/dgit/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/dgit/profile.js
var require_profile6 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/dgit/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dGitProfile = void 0;
    exports.dGitProfile = {
      name: "dGitProvider",
      methods: ["clone", "addremote", "delremote", "remotes", "init", "status", "log", "commit", "add", "reset", "rm", "lsfiles", "readblob", "resolveref", "branch", "branches", "checkout", "currentbranch", "zip", "push", "pull", "setIpfsConfig", "getItem", "setItem", "localStorageUsed"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/dgit/index.js
var require_dgit = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/dgit/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api7(), exports);
    tslib_1.__exportStar(require_profile6(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/git/api.js
var require_api8 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/git/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/git/profile.js
var require_profile7 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/git/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gitProfile = void 0;
    exports.gitProfile = {
      name: "remixd.git",
      methods: ["clone", "checkout", "init", "add", "commit", "fetch", "pull", "push", "reset", "status", "remote", "log"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/git/index.js
var require_git = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/git/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api8(), exports);
    tslib_1.__exportStar(require_profile7(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/network/api.js
var require_api9 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/network/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/network/type.js
var require_type6 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/network/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/network/profile.js
var require_profile8 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/network/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.networkProfile = void 0;
    exports.networkProfile = {
      name: "network",
      methods: ["addNetwork", "detectNetwork", "getEndpoint", "getNetworkProvider", "removeNetwork"],
      events: ["providerChanged"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/network/index.js
var require_network = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/network/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api9(), exports);
    tslib_1.__exportStar(require_type6(), exports);
    tslib_1.__exportStar(require_profile8(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/plugin-manager/api.js
var require_api10 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/plugin-manager/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/plugin-manager/profile.js
var require_profile9 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/plugin-manager/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pluginManagerProfile = void 0;
    exports.pluginManagerProfile = {
      name: "manager",
      methods: ["getProfile", "updateProfile", "activatePlugin", "deactivatePlugin", "isActive", "canCall"],
      events: ["pluginActivated", "pluginDeactivated", "profileAdded", "profileUpdated"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/plugin-manager/index.js
var require_plugin_manager = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/plugin-manager/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api10(), exports);
    tslib_1.__exportStar(require_profile9(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/settings/api.js
var require_api11 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/settings/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/settings/profile.js
var require_profile10 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/settings/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.settingsProfile = void 0;
    exports.settingsProfile = {
      name: "settings",
      methods: ["getGithubAccessToken"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/settings/index.js
var require_settings = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/settings/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api11(), exports);
    tslib_1.__exportStar(require_profile10(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/theme/api.js
var require_api12 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/theme/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/theme/profile.js
var require_profile11 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/theme/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.themeProfile = void 0;
    exports.themeProfile = {
      name: "theme",
      methods: ["currentTheme"],
      events: ["themeChanged"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/theme/types.js
var require_types = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/theme/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/theme/index.js
var require_theme = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/theme/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api12(), exports);
    tslib_1.__exportStar(require_profile11(), exports);
    tslib_1.__exportStar(require_types(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/udapp/api.js
var require_api13 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/udapp/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/udapp/type.js
var require_type7 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/udapp/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/udapp/profile.js
var require_profile12 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/udapp/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.udappProfile = void 0;
    exports.udappProfile = {
      name: "udapp",
      methods: ["createVMAccount", "getAccounts", "sendTransaction", "getSettings", "setEnvironmentMode"],
      events: ["newTransaction"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/udapp/index.js
var require_udapp = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/udapp/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api13(), exports);
    tslib_1.__exportStar(require_type7(), exports);
    tslib_1.__exportStar(require_profile12(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/unit-testing/api.js
var require_api14 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/unit-testing/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/unit-testing/type.js
var require_type8 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/unit-testing/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/unit-testing/profile.js
var require_profile13 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/unit-testing/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unitTestProfile = void 0;
    exports.unitTestProfile = {
      name: "unitTest",
      methods: ["testFromPath", "testFromSource"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/unit-testing/index.js
var require_unit_testing = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/unit-testing/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api14(), exports);
    tslib_1.__exportStar(require_type8(), exports);
    tslib_1.__exportStar(require_profile13(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/window/api.js
var require_api15 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/window/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/window/profile.js
var require_profile14 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/window/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.windowProfile = void 0;
    exports.windowProfile = {
      name: "window",
      methods: ["prompt", "confirm", "alert"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/window/index.js
var require_window = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/window/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api15(), exports);
    tslib_1.__exportStar(require_profile14(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/vscextapi/api.js
var require_api16 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/vscextapi/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/vscextapi/profile.js
var require_profile15 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/vscextapi/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.vscodeExtProfile = void 0;
    exports.vscodeExtProfile = {
      name: "vscodeExtAPI",
      methods: ["executeCommand"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/vscextapi/index.js
var require_vscextapi = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/vscextapi/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api16(), exports);
    tslib_1.__exportStar(require_profile15(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/terminal/api.js
var require_api17 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/terminal/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/terminal/type.js
var require_type9 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/terminal/type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/terminal/profile.js
var require_profile16 = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/terminal/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.terminalProfile = void 0;
    exports.terminalProfile = {
      name: "terminal",
      methods: ["log"]
    };
  }
});

// node_modules/@remixproject/plugin-api/src/lib/terminal/index.js
var require_terminal = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/terminal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api17(), exports);
    tslib_1.__exportStar(require_type9(), exports);
    tslib_1.__exportStar(require_profile16(), exports);
  }
});

// node_modules/@remixproject/plugin-api/src/lib/remix-profile.js
var require_remix_profile = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/remix-profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.remixProfiles = exports.remixApi = void 0;
    var compiler_1 = require_compiler();
    var file_manager_1 = require_file_manager();
    var editor_1 = require_editor();
    var network_1 = require_network();
    var udapp_1 = require_udapp();
    var theme_1 = require_theme();
    var unit_testing_1 = require_unit_testing();
    var content_import_1 = require_content_import();
    var settings_1 = require_settings();
    var git_1 = require_git();
    var vscextapi_1 = require_vscextapi();
    var plugin_manager_1 = require_plugin_manager();
    var file_panel_1 = require_file_panel();
    var dgit_1 = require_dgit();
    var terminal_1 = require_terminal();
    exports.remixApi = Object.freeze({
      manager: plugin_manager_1.pluginManagerProfile,
      solidity: Object.assign(Object.assign({}, compiler_1.compilerProfile), { name: "solidity" }),
      fileManager: Object.assign(Object.assign({}, file_manager_1.filSystemProfile), { name: "fileManager" }),
      dGitProvider: dgit_1.dGitProfile,
      filePanel: file_panel_1.filePanelProfile,
      solidityUnitTesting: Object.assign(Object.assign({}, unit_testing_1.unitTestProfile), { name: "solidityUnitTesting" }),
      editor: editor_1.editorProfile,
      network: network_1.networkProfile,
      udapp: udapp_1.udappProfile,
      contentImport: content_import_1.contentImportProfile,
      settings: settings_1.settingsProfile,
      theme: theme_1.themeProfile,
      vscodeExtAPI: vscextapi_1.vscodeExtProfile,
      terminal: terminal_1.terminalProfile
    });
    exports.remixProfiles = Object.freeze({
      manager: plugin_manager_1.pluginManagerProfile,
      solidity: Object.assign(Object.assign({}, compiler_1.compilerProfile), { name: "solidity" }),
      fileManager: Object.assign(Object.assign({}, file_manager_1.filSystemProfile), { name: "fileManager" }),
      git: Object.assign(Object.assign({}, git_1.gitProfile), { name: "git" }),
      dGitProvider: dgit_1.dGitProfile,
      filePanel: file_panel_1.filePanelProfile,
      solidityUnitTesting: Object.assign(Object.assign({}, unit_testing_1.unitTestProfile), { name: "solidityUnitTesting" }),
      editor: editor_1.editorProfile,
      network: network_1.networkProfile,
      udapp: udapp_1.udappProfile,
      contentImport: content_import_1.contentImportProfile,
      settings: settings_1.settingsProfile,
      theme: theme_1.themeProfile,
      vscodeExtAPI: vscextapi_1.vscodeExtProfile,
      terminal: terminal_1.terminalProfile
    });
  }
});

// node_modules/@remixproject/plugin-api/src/lib/standard-profile.js
var require_standard_profile = __commonJS({
  "node_modules/@remixproject/plugin-api/src/lib/standard-profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.standardProfiles = void 0;
    var compiler_1 = require_compiler();
    var file_manager_1 = require_file_manager();
    var editor_1 = require_editor();
    var network_1 = require_network();
    var udapp_1 = require_udapp();
    var plugin_manager_1 = require_plugin_manager();
    exports.standardProfiles = Object.freeze({
      manager: plugin_manager_1.pluginManagerProfile,
      solidity: Object.assign(Object.assign({}, compiler_1.compilerProfile), { name: "solidity" }),
      fileManager: Object.assign(Object.assign({}, file_manager_1.filSystemProfile), { name: "fileManager" }),
      editor: editor_1.editorProfile,
      network: network_1.networkProfile,
      udapp: udapp_1.udappProfile
    });
  }
});

// node_modules/@remixproject/plugin-api/src/index.js
var require_src = __commonJS({
  "node_modules/@remixproject/plugin-api/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_compiler(), exports);
    tslib_1.__exportStar(require_content_import(), exports);
    tslib_1.__exportStar(require_editor(), exports);
    tslib_1.__exportStar(require_file_manager(), exports);
    tslib_1.__exportStar(require_file_panel(), exports);
    tslib_1.__exportStar(require_dgit(), exports);
    tslib_1.__exportStar(require_git(), exports);
    tslib_1.__exportStar(require_network(), exports);
    tslib_1.__exportStar(require_plugin_manager(), exports);
    tslib_1.__exportStar(require_settings(), exports);
    tslib_1.__exportStar(require_theme(), exports);
    tslib_1.__exportStar(require_udapp(), exports);
    tslib_1.__exportStar(require_unit_testing(), exports);
    tslib_1.__exportStar(require_window(), exports);
    tslib_1.__exportStar(require_remix_profile(), exports);
    tslib_1.__exportStar(require_standard_profile(), exports);
  }
});

// node_modules/@remixproject/plugin-utils/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign, __createBinding, __setModuleDefault;
var init_tslib_es62 = __esm({
  "node_modules/@remixproject/plugin-utils/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    };
    __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/tools/event-name.js
var require_event_name = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/tools/event-name.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.listenEvent = exports.callEvent = void 0;
    function callEvent(name, key, id) {
      return `[${name}] ${key}-${id}`;
    }
    exports.callEvent = callEvent;
    function listenEvent(name, key) {
      return `[${name}] ${key}`;
    }
    exports.listenEvent = listenEvent;
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/tools/method-path.js
var require_method_path = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/tools/method-path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRootPath = exports.getMethodPath = void 0;
    function getMethodPath(method, path) {
      if (!path) {
        return method;
      }
      const part = path.split(".");
      part.shift();
      part.push(method);
      return part.join(".");
    }
    exports.getMethodPath = getMethodPath;
    function getRootPath(path) {
      return path.split(".").shift();
    }
    exports.getRootPath = getRootPath;
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/tools/service.js
var require_service = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/tools/service.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluginService = exports.activateService = exports.createService = exports.getMethods = exports.isPluginService = void 0;
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    var method_path_1 = require_method_path();
    exports.isPluginService = (service) => {
      return service instanceof PluginService;
    };
    function getMethods(service) {
      if (service.methods) {
        for (const method of service.methods) {
          if (!(method in service)) {
            throw new Error(`Method ${method} is not part of serivce`);
          }
        }
        return service.methods;
      }
      if (exports.isPluginService(service)) {
        const methods = Object.getPrototypeOf(service);
        return Object.getOwnPropertyNames(methods).filter((m) => {
          return m !== "constructor" && !m.startsWith("_");
        });
      } else {
        return Object.getOwnPropertyNames(service).filter((key) => {
          return typeof service[key] === "function" && !key.startsWith("_");
        });
      }
    }
    exports.getMethods = getMethods;
    function createService(path, service) {
      if (service.path && method_path_1.getRootPath(service.path) !== path) {
        throw new Error(`Service path ${service.path} is different from the one provided: ${path}`);
      }
      const methods = getMethods(service);
      for (const method of methods) {
        if (!(method in service)) {
          throw new Error(`Method ${method} is not part of service ${path}`);
        }
      }
      if (exports.isPluginService(service)) {
        if (!service.methods) {
          service.methods = methods;
        }
        return service;
      } else {
        return Object.assign(Object.assign({}, service), { methods, path });
      }
    }
    exports.createService = createService;
    function activateService(client, service) {
      client.methods = [
        ...client.methods || [],
        ...service.methods
      ];
      const methods = getMethods(service);
      for (const method of methods) {
        client[`${service.path}.${method}`] = service[method].bind(service);
      }
      return client.call("manager", "updateProfile", { methods: client.methods });
    }
    exports.activateService = activateService;
    var PluginService = class {
      emit(key, ...payload) {
        this.plugin.emit(key, ...payload);
      }
      /**
       * Create a subservice under this service
       * @param name The name of the subservice inside this service
       * @param service The subservice to add
       */
      createService(name, service) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          if (this.methods.includes(name)) {
            throw new Error("A service cannot have the same name as an exposed method");
          }
          const path = `${this.path}.${name}`;
          const _service = createService(path, service);
          yield activateService(this.plugin, _service);
          return _service;
        });
      }
      /**
       * Prepare a service to be lazy loaded.
       * Service can be activated by doing `client.activateService(path)`
       * @param name The name of the subservice inside this service
       * @param factory A function to create the service on demand
       */
      prepareService(name, factory) {
        if (this.methods.includes(name)) {
          throw new Error("A service cannot have the same name as an exposed method");
        }
        const path = `${this.path}.${name}`;
        this.plugin.activateService[path] = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
          const service = factory();
          const _service = createService(path, service);
          yield activateService(this.plugin, _service);
          delete this.plugin.activateService[path];
          return _service;
        });
      }
    };
    exports.PluginService = PluginService;
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/tools/queue.js
var require_queue = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/tools/queue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluginQueueItem = void 0;
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    var PluginQueueItem = class {
      constructor(resolve, reject, request, method, options, args) {
        this.options = {};
        this.resolve = resolve;
        this.reject = reject;
        this.method = method;
        this.request = request;
        this.timer = void 0;
        this.timedout = false;
        this.canceled = false;
        this.finished = false;
        this.running = false;
        this.args = args;
        this.options = options;
      }
      setCurrentRequest(request) {
        throw new Error("Cannot call this directly");
      }
      callMethod(method, args) {
        throw new Error("Cannot call this directly");
      }
      letContinue() {
        throw new Error("Cannot call this directly");
      }
      cancel() {
        this.canceled = true;
        clearTimeout(this.timer);
        this.reject(`[CANCEL] Canceled call ${this.method} from ${this.request.from}`);
        if (this.running)
          this.letContinue();
      }
      run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          if (this.canceled) {
            this.letContinue();
            return;
          }
          this.timer = setTimeout(() => {
            this.timedout = true;
            this.reject(`[TIMEOUT] Timeout for call ${this.method} from ${this.request.from}`);
            this.letContinue();
          }, this.options.queueTimeout || 1e4);
          this.running = true;
          this.setCurrentRequest(this.request);
          try {
            const result = yield this.callMethod(this.method, this.args);
            if (this.timedout || this.canceled)
              return;
            this.resolve(result);
          } catch (err) {
            this.reject(err);
          }
          this.finished = true;
          this.running = false;
          clearTimeout(this.timer);
          this.letContinue();
        });
      }
    };
    exports.PluginQueueItem = PluginQueueItem;
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/api.js
var require_api18 = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/message.js
var require_message = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/message.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/plugin.js
var require_plugin = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/plugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/profile.js
var require_profile17 = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/profile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/service.js
var require_service2 = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/service.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/status.js
var require_status = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/status.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/queue.js
var require_queue2 = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/queue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/lib/types/options.js
var require_options = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/lib/types/options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@remixproject/plugin-utils/src/index.js
var require_src2 = __commonJS({
  "node_modules/@remixproject/plugin-utils/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_event_name(), exports);
    tslib_1.__exportStar(require_method_path(), exports);
    tslib_1.__exportStar(require_service(), exports);
    tslib_1.__exportStar(require_queue(), exports);
    tslib_1.__exportStar(require_api18(), exports);
    tslib_1.__exportStar(require_message(), exports);
    tslib_1.__exportStar(require_plugin(), exports);
    tslib_1.__exportStar(require_profile17(), exports);
    tslib_1.__exportStar(require_service2(), exports);
    tslib_1.__exportStar(require_status(), exports);
    tslib_1.__exportStar(require_queue2(), exports);
    tslib_1.__exportStar(require_options(), exports);
  }
});

// node_modules/@remixproject/plugin/src/lib/client.js
var require_client = __commonJS({
  "node_modules/@remixproject/plugin/src/lib/client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluginClient = exports.handleConnectionError = exports.defaultOptions = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var events_1 = require_events();
    var plugin_api_1 = require_src();
    var plugin_utils_1 = require_src2();
    exports.defaultOptions = {
      customTheme: false,
      customApi: plugin_api_1.remixProfiles
    };
    function handleConnectionError(devMode) {
      const err = devMode ? `Make sure the port of the IDE is ${devMode.port}` : "If you are using a local IDE, make sure to add devMode in client options";
      throw new Error(`Not connected to the IDE. ${err}`);
    }
    exports.handleConnectionError = handleConnectionError;
    var PluginClient = class {
      constructor(options = {}) {
        this.id = 0;
        this.isLoaded = false;
        this.events = new events_1.EventEmitter();
        this.activateService = {};
        this.options = Object.assign(Object.assign({}, exports.defaultOptions), options);
        this.events.once("loaded", () => {
          this.isLoaded = true;
          if (this.onActivation)
            this.onActivation();
        });
      }
      // Wait until this connection is settled
      onload(cb) {
        return new Promise((res, rej) => {
          const loadFn = () => {
            res();
            if (cb)
              cb();
          };
          this.isLoaded ? loadFn() : this.events.once("loaded", () => loadFn());
        });
      }
      /**
       * Ask the plugin manager if current request can call a specific method
       * @param method The method to call
       * @param message An optional message to show to the user
       */
      askUserPermission(method, message) {
        if (!this.currentRequest) {
          return Promise.resolve(true);
        }
        if (this.methods.includes(method)) {
          const from = this.currentRequest.from;
          const to = this.name;
          return this.call("manager", "canCall", from, to, method, message);
        } else {
          return Promise.resolve(false);
        }
      }
      /**
       * Called before deactivating the plugin
       * @param from profile of plugin asking to deactivate
       * @note PluginManager will always be able to deactivate
       */
      canDeactivate(from) {
        return true;
      }
      //////////////////////
      // CALL / ON / EMIT //
      //////////////////////
      /** Make a call to another plugin */
      call(name, key, ...payload) {
        if (!this.isLoaded)
          handleConnectionError(this.options.devMode);
        this.id++;
        return new Promise((res, rej) => {
          const callName = plugin_utils_1.callEvent(name, key, this.id);
          this.events.once(callName, (result, error) => {
            error ? rej(new Error(`Error from IDE : ${error}`)) : res(result);
          });
          this.events.emit("send", { action: "request", name, key, payload, id: this.id });
        });
      }
      cancel(name, key) {
        if (!this.isLoaded)
          handleConnectionError(this.options.devMode);
        this.events.emit("send", { action: "cancel", name, key });
      }
      /** Listen on event from another plugin */
      on(name, key, cb) {
        const eventName = plugin_utils_1.listenEvent(name, key);
        this.events.on(eventName, cb);
        this.events.emit("send", { action: "on", name, key, id: this.id });
      }
      /** Listen once on event from another plugin */
      once(name, key, cb) {
        const eventName = plugin_utils_1.listenEvent(name, key);
        this.events.once(eventName, cb);
        this.events.emit("send", { action: "once", name, key, id: this.id });
      }
      /** Remove all listeners on an event from an external plugin */
      off(name, key) {
        const eventName = plugin_utils_1.listenEvent(name, key);
        this.events.removeAllListeners(eventName);
        this.events.emit("send", { action: "off", name, key, id: this.id });
      }
      /** Expose an event for the IDE */
      emit(key, ...payload) {
        if (!this.isLoaded)
          handleConnectionError(this.options.devMode);
        this.events.emit("send", { action: "emit", key, payload });
      }
      /////////////
      // SERVICE //
      /////////////
      /**
       * Create a service under the client node
       * @param name The name of the service
       * @param service The service
       */
      createService(name, service) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          if (this.methods && this.methods.includes(name)) {
            throw new Error("A service cannot have the same name as an exposed method");
          }
          const _service = plugin_utils_1.createService(name, service);
          yield plugin_utils_1.activateService(this, _service);
          return _service;
        });
      }
      /**
       * Prepare a service to be lazy loaded
       * @param name The name of the subservice inside this service
       * @param factory A function to create the service on demand
       */
      prepareService(name, factory) {
        return this.activateService[name] = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
          if (this.methods && this.methods.includes(name)) {
            throw new Error("A service cannot have the same name as an exposed method");
          }
          const service = yield factory();
          const _service = plugin_utils_1.createService(name, service);
          yield plugin_utils_1.activateService(this, _service);
          delete this.activateService[name];
          return _service;
        });
      }
    };
    exports.PluginClient = PluginClient;
  }
});

// node_modules/@remixproject/plugin/src/lib/connector.js
var require_connector = __commonJS({
  "node_modules/@remixproject/plugin/src/lib/connector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConnectorClient = exports.applyApi = exports.connectClient = exports.isPluginMessage = exports.isHandshake = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var plugin_utils_1 = require_src2();
    var client_1 = require_client();
    var api_1 = require_api();
    function isHandshake(message) {
      return message.key === "handshake" && (message.action === "request" || message.action === "call");
    }
    exports.isHandshake = isHandshake;
    function isPluginMessage(message) {
      return typeof message === "object" && "action" in message && "name" in message;
    }
    exports.isPluginMessage = isPluginMessage;
    function connectClient(connector, client = new client_1.PluginClient()) {
      let isLoaded = false;
      connector.on(({ action, key, name, payload, id, requestInfo, error }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          if (isHandshake({ action, key })) {
            if (!isLoaded) {
              isLoaded = true;
              client.events.on("send", (msg) => connector.send(msg));
              client.events.emit("loaded");
              client.name = payload[0];
            }
            const message = { action: "response", name, key, id, payload: client.methods };
            connector.send(message);
            return;
          }
          if (!isLoaded)
            throw new Error("Handshake before communicating");
          switch (action) {
            case "emit":
            case "notification": {
              client.events.emit(plugin_utils_1.listenEvent(name, key), ...payload);
              break;
            }
            case "response": {
              client.events.emit(plugin_utils_1.callEvent(name, key, id), payload, error);
              delete client.currentRequest;
              break;
            }
            case "call":
            case "request": {
              const path = requestInfo && requestInfo.path;
              const method = plugin_utils_1.getMethodPath(key, path);
              if (!client[method]) {
                throw new Error(`Method ${method} doesn't exist on plugin ${name}`);
              }
              client.currentRequest = requestInfo;
              const result = yield client[method](...payload);
              const message = { action: "response", name, key, id, payload: result };
              connector.send(message);
              break;
            }
          }
        } catch (err) {
          console.error(err);
          const message = { action: action === "request" ? "response" : action, name, key, id, error: err.message || err };
          connector.send(message);
        }
      }));
      if (!isLoaded) {
        connector.send({ action: "request", key: "handshake", id: -1 });
      }
      return client;
    }
    exports.connectClient = connectClient;
    function applyApi(client) {
      const profiles = client.options.customApi || {};
      for (const name in profiles) {
        if (client[name]) {
          const error = `Your plugin client should have a method/attribut named "${name}" as it is the name of another plugin. `;
          const solution = `To prevent this set the option "customApi" to "null" in the client's options. `;
          const example = `For exemple: "const client = createClient(new PluginClient<any, any>({ customApi: null }))".`;
          throw new Error(error + solution + example);
        }
        client[name] = api_1.createApi(client, profiles[name]);
      }
    }
    exports.applyApi = applyApi;
    exports.createConnectorClient = (connector, client = new client_1.PluginClient()) => {
      const c = client;
      connectClient(connector, c);
      applyApi(c);
      return c;
    };
  }
});

// node_modules/@remixproject/plugin/src/lib/node.js
var require_node = __commonJS({
  "node_modules/@remixproject/plugin/src/lib/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluginNode = void 0;
    var plugin_utils_1 = require_src2();
    var PluginNode = class _PluginNode {
      /**
       * @param path Path to external plugin
       * @param client The main client used in this plugin
       */
      constructor(path, client) {
        this.path = path;
        this.client = client;
      }
      get(name) {
        return new _PluginNode(`${this.path}.${name}`, this.client);
      }
      /** Call a method of the node */
      call(method, ...payload) {
        return this.client.call(this.path, method, payload);
      }
      /**
       * Listen to an event from the plugin
       * @note Event are trigger at the root level yet, not on a specific node
       */
      on(method, cb) {
        this.client.on(plugin_utils_1.getRootPath(this.path), method, cb);
      }
    };
    exports.PluginNode = PluginNode;
  }
});

// node_modules/@remixproject/plugin/src/lib/origin.js
var require_origin = __commonJS({
  "node_modules/@remixproject/plugin/src/lib/origin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkOrigin = exports.getDevmodeOrigins = exports.getOriginsFromUrl = exports.remixOrgins = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    exports.remixOrgins = "https://gist.githubusercontent.com/EthereumRemix/091ccc57986452bbb33f57abfb13d173/raw/3367e019335746b73288e3710af2922d4c8ef5a3/origins.json";
    function getOriginsFromUrl(url) {
      return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        return res.json();
      });
    }
    exports.getOriginsFromUrl = getOriginsFromUrl;
    function getDevmodeOrigins({ devMode }) {
      const localhost = devMode.port ? [
        `http://127.0.0.1:${devMode.port}`,
        `http://localhost:${devMode.port}`,
        `https://127.0.0.1:${devMode.port}`,
        `https://localhost:${devMode.port}`
      ] : [];
      const devOrigins = devMode.origins ? typeof devMode.origins === "string" ? [devMode.origins] : devMode.origins : [];
      return [...localhost, ...devOrigins];
    }
    exports.getDevmodeOrigins = getDevmodeOrigins;
    function checkOrigin(origin, options = {}) {
      return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let origins = [];
        if (options.allowOrigins) {
          if (Array.isArray(options.allowOrigins)) {
            origins = origins.concat(options.allowOrigins);
          } else {
            const allOrigins = yield getOriginsFromUrl(options.allowOrigins);
            origins = origins.concat(allOrigins);
          }
        } else if (options.devMode) {
          const devModes = getDevmodeOrigins(options);
          origins = origins.concat(devModes);
        } else {
          return true;
        }
        return origins.includes(origin);
      });
    }
    exports.checkOrigin = checkOrigin;
  }
});

// node_modules/@remixproject/plugin/src/index.js
var require_src3 = __commonJS({
  "node_modules/@remixproject/plugin/src/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api(), exports);
    tslib_1.__exportStar(require_client(), exports);
    tslib_1.__exportStar(require_connector(), exports);
    tslib_1.__exportStar(require_node(), exports);
    tslib_1.__exportStar(require_origin(), exports);
  }
});

export {
  require_src3 as require_src
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=chunk-QCTY7TJT.js.map
