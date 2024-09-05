<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Poll Webapp Spring</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

	<h1>Add user</h1>
	
	<form method="post">
		<input type="text" placeholder="Name" name="name" value="${user.name}"><span>${ errors["name"] }</span><br/>
		<input type="text" placeholder="Email" name="email" value="${user.email}"><span>${ errors["email"] }</span><br/>
		<input type="password" placeholder="Password" name="password" value="${user.password}"><span>${ errors["password"] }</span><br/>
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		
		<button>Submit</button>
		<button type="button" onClick="location.href='${pageContext.request.contextPath}/users'">Cancel</button>
	</form>
	
</body>
</html>
