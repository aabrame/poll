FROM maven:3.9.6 AS build
WORKDIR /app
COPY . .
RUN mvn -DskipTests package

FROM amazoncorretto:21-alpine
RUN addgroup --system spring && adduser --system spring spring
USER spring:spring
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]