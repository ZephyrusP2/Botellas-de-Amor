from rest_framework import permissions


class IsSelf(permissions.BasePermission):
    """
    Allows access only to the user itself.
    """

    def has_permission(self, request, view):
        return request.user == view.get_object()


class IsAdminOrSelf(permissions.BasePermission):
    """
    Allows access only to admin users or the user itself.
    """

    def has_permission(self, request, view):
        return request.user == view.get_object() or request.user.role == "admin"


class IsAdmin(permissions.BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return request.user.role == "admin"


class IsOperator(permissions.BasePermission):
    """
    Allows access only to operator users.
    """

    def has_permission(self, request, view):
        return request.user.role == "operator"


class IsAdminOrOperator(permissions.BasePermission):
    """
    Allows access only to admin or operator users.
    """

    def has_permission(self, request, view):
        return request.user.role == "admin" or request.user.role == "operator"


class IsAdminOrOperatorOrSelf(permissions.BasePermission):
    """
    Allows access only to admin or operator users or the user itself.
    """

    def has_permission(self, request, view):
        return (
            request.user.role == "admin"
            or request.user.role == "operator"
            or request.user == view.get_object()
        )
