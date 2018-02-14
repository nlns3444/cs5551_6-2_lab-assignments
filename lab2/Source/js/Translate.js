var app=angular.module("Translate",[]);
app.controller("Translatecontroller",function ($scope,$http) {
    $scope.translate = function () {
        console.log(6+5);
        var keyword = document.getElementById('justwatchkeyword').value;
        console.log(keyword);
        var language= document.getElementById('lang').value;
        console.log(language);
        $http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180212T235649Z.4104450599b2c994.22c253176cf1d5ea16fb348837bfceb5e1bc94a2'+'&text='+keyword+'&lang='+language).success(function (data) {

            console.log(data);
             $scope.translatorWord=data.text;
        })

    }
})