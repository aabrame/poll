<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Poll Webapp Spring</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript" src="${pageContext.request.contextPath}/js/userList.js" defer="true"></script>
</head>
<body>
	<security:authorize access="isAuthenticated()">
	    authenticated as <security:authentication property="principal.username" /> 
		<a href="${pageContext.request.contextPath}/logout">logout</a> 
	</security:authorize>
	<security:authorize access="isAnonymous()">
		<a href="${pageContext.request.contextPath}/login">login</a> 
	</security:authorize>

	<h1>Users</h1>
	
	<a href="${pageContext.request.contextPath}/users/add">add</a>

	<ul>
		<c:forEach items="${ users }" var="user">
			<li>
				${ user.name } - 
				<a href="${pageContext.request.contextPath}/users/${ user.id }">details</a> -
				<button data-delete-link="${pageContext.request.contextPath}/users/${ user.id }/delete">delete</button> - 
				</li>
		</c:forEach>
	</ul>

</body>
</html>
