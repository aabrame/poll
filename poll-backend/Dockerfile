FROM maven as build
WORKDIR /app
COPY . .
RUN mvn -DskipTests package

FROM maven
RUN addgroup --system spring && adduser --system --group spring
USER spring:spring
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
