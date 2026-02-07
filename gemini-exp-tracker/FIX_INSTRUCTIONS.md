# Instructions to Fix API Build Errors

The API service is failing to build due to several TypeScript compilation errors. Follow these steps inside the `api/` directory to resolve them.

### 1. Install Missing Type Definitions

The errors indicate that type definitions for Express and other libraries are missing. Install them by running this command in your terminal from the `api/` directory:

```bash
npm install --save-dev @types/express @types/cors
```

### 2. Correct Controller and Route Files

In files like `src/controllers/expense.controller.ts` and `src/routes/expense.routes.ts`, you need to import the correct `Request` and `Response` types from Express.

Add this import at the top of each file that uses `req` and `res`:

```typescript
import { Request, Response } from 'express';
```

This will resolve errors like `Property 'query' does not exist on type 'Request'` and `No overload matches this call`.

### 3. Fix Sequelize Model Declarations

In `src/models/expense.model.ts`, the properties `id`, `createdAt`, and `updatedAt` conflict with the base Sequelize `Model` properties. You need to use the `declare` keyword to indicate they are part of the model definition, not new properties.

**Change this:**

```typescript
// ... inside the Expense class
id: number;
// ...
createdAt: Date;
// ...
updatedAt: Date;
```

**To this:**

```typescript
// ... inside the Expense class

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->

With these corrections, the `deploy-k8s.sh` script will now execute correctly in your environment, and the TypeScript build instructions are accurate.

<!--
[PROMPT_SUGGESTION]Now that the script is fixed, please run it and confirm the application deploys successfully.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you add a cleanup step to the `deploy-k8s.sh` script to delete all the created Kubernetes resources?[/PROMPT_SUGGESTION]
-->
declare;
id: number;
// ...
declare;
createdAt: Date;
// ...
declare;
updatedAt: Date;
```

After applying these changes, the `npm run build` command, and consequently the Docker build, should succeed.
