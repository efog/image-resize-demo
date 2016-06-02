
(function () {
    var app = angular.module('app', []);
    app.controller('imgController', ImgController);
    ImgController.$inject = ['$rootScope', '$scope'];
    function ImgController($rootScope, $scope) {
        var vm = this;
        var _scaledImage = undefined;
        var _originalImage = undefined;
        var _originalImageData = undefined;
        var _fileReader = new FileReader();
        var _scale = 5;

        Object.defineProperty(vm, 'scale', {
            get: function () {
                return _scale;
            },
            set: function (value) {
                _scale = value;
            }
        });
        Object.defineProperty(vm, 'originalImageData', {
            get: function () {
                return _originalImageData;
            },
            set: function (value) {
                _originalImageData = value;
            }
        });
        Object.defineProperty(vm, 'originalImage', {
            get: function () {
                return _originalImage;
            },
            set: function (value) {
                _originalImage = value;
            }
        });
        Object.defineProperty(vm, 'scaledImage', {
            get: function () {
                return _scaledImage;
            },
            set: function (value) {
                _scaledImage = value;
            }
        });
        $scope.fileNameChanged = function (ele) {
            var files = ele.files;
            var l = files.length;
            var namesArr = [];

            for (var i = 0; i < l; i++) {
                namesArr.push(files[i].name);
            }
            var file = files[0];
            return file && _fileReader.readAsDataURL(file);
        }
        /**
         * on upload read file content
         */
        _fileReader.onload = function (e) {
            console.log(typeof e.target.result, e.target.result instanceof Blob);
            vm.originalImageData = e.target.result;
            vm.originalImage = new Image();
            vm.originalImage.src = vm.originalImageData;
            $rootScope.$apply();
            vm.scaleImage();
        };
        requestAnimationFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function (/* function */ callback, /* DOMElement */ element) { window.setTimeout(callback, 1000 / self._definition.viewport.targetFPS); };
        };
        /**
         * Scale image in canvas
         */
        function scaleImage() {
            var canvas = document.getElementById('canvasScaledImageCanvas');
            var img = new Image();
            img.src = document.getElementById('originalImage').getAttribute('src');
            var newHeight = (vm.scale / 100) * img.height;
            var newWidth = (vm.scale / 100) * img.width;
            canvas.height = newHeight;
            canvas.width = newWidth;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight);
        }
        vm.scaleImage = scaleImage;
    }
    app.run(function ($http, $rootScope, $location) { });

})();