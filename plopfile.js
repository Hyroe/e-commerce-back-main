module.exports = function (plop) {
  // Generator for a controller
  plop.setGenerator("controller", {
    description: "Generate a controller",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Controller name (without "Controller" suffix):',
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/interface/controllers/{{pascalCase name}}Controller.ts",
        templateFile: "plop-templates/controller.hbs",
      },
    ],
  });

  // Generator for a service (use case) and its interface
  plop.setGenerator("service", {
    description: "Generate a service (use case) with its interface",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Service name (without "Service" suffix):',
      },
    ],
    actions: [
      // Action to generate the service implementation
      {
        type: "add",
        path: "src/infrastructure/services/{{pascalCase name}}Service.ts",
        templateFile: "plop-templates/service.hbs",
      },
      // Action to generate the service interface
      {
        type: "add",
        path: "src/domain/interfaces/services/I{{pascalCase name}}Service.ts",
        templateFile: "plop-templates/service-interface.hbs",
      },
    ],
  });

  // Generator for a request DTO
  plop.setGenerator("request-dto", {
    description: "Generate a Request DTO",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Request DTO name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/interface/dto/request/{{pascalCase name}}RequestDTO.ts",
        templateFile: "plop-templates/request-dto.hbs",
      },
    ],
  });

  // Generator for a response DTO
  plop.setGenerator("response-dto", {
    description: "Generate a Response DTO",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Response DTO name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/interface/dto/response/{{pascalCase name}}ResponseDTO.ts",
        templateFile: "plop-templates/response-dto.hbs",
      },
    ],
  });

  // Generator for a repository
  plop.setGenerator("repository", {
    description: "Generate a repository",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Repository name (without "Repository" suffix):',
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/infrastructure/repositories/{{pascalCase name}}Repository.ts",
        templateFile: "plop-templates/repository.hbs",
      },
    ],
  });

  // Generator for a route
  plop.setGenerator("route", {
    description: "Generate a route",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Route name (without "Route" suffix):',
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/interface/routes/{{camelCase name}}Routes.ts",
        templateFile: "plop-templates/route.hbs",
      },
    ],
  });

  // Generator for an entity
  plop.setGenerator("entity", {
    description: "Generate a new entity",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Entity name (without "Entity" suffix):',
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/domain/entities/{{pascalCase name}}.ts",
        templateFile: "plop-templates/entity.hbs",
      },
    ],
  });

  plop.setGenerator("prisma", {
    description: "Generate a Prisma schema file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Schema name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "prisma/schema/{{camelCase name}}.prisma",
        templateFile: "plop-templates/prisma-schema.hbs",
      },
    ],
  });
};
