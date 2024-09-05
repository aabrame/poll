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

	<h1>User ${user.id}</h1>
	<a href="${pageContext.request.contextPath}/users">back</a>
	<ul>
			<li><strong>name</strong>: ${user.name}</li>
			<li><strong>email</strong>: ${user.email}</li>
			<li><strong>password</strong>: ${user.password}</li>
	</ul>

</body>
</html>
