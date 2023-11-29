function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'templates/member.html',
    controller: 'MemberController',
    controllerAs: 'memberCtrl',
    bindToController: true,
    scope: {
      member: '='
    }
  };
}