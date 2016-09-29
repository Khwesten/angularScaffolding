(function() {
    'use strict';
    App.factory('Profile', function () {


        var _roles = {
            interviewer   : 'Agente',
            fiscal        : 'Fiscal',
            school_admin  : 'Administrador',
            admin         : 'Full Administrador',
            student       : 'Aluno'
        };

        var _permissions = {
            interviewer   : [],
            fiscal        : [],
            school_admin  : [],
            admin         : [],
            student       : []
        };


        return {
            roles        : _roles,
            permissions  : _permissions
        };

    });
})();
