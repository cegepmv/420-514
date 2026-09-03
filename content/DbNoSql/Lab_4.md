

## 1. Installer les dépendances

```bash
npm install class-validator class-transformer
```

Ajouter cette configuration à l'app :

```ts
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
    }),
  );
```

## 2. Uniformiser les erreurs avec Problem Details

### `src/common/dto/problem-details.dto.ts`

```ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProblemDetailsDto {
  @ApiProperty({
    example: 'https://energy-api.example/problems/validation-error',
  })
  type: string;

  @ApiProperty({ example: 'Données invalides' })
  title: string;

  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({
    example: 'La requête contient des données invalides',
  })
  detail: string;

  @ApiProperty({ example: '/api/v1/buildings' })
  instance: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Le nom du bâtiment est obligatoire'],
  })
  errors?: string[];
}
```

### `src/common/filters/problem-details.filter.ts`

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

type NestErrorBody = {
  message?: string | string[];
  error?: string;
};

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : undefined;

    const body: NestErrorBody =
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
        ? (exceptionResponse as NestErrorBody)
        : {};

    const messages = Array.isArray(body.message)
      ? body.message
      : body.message
        ? [body.message]
        : [];

    const title = this.getTitle(status);

    response
      .status(status)
      .type('application/problem+json')
      .json({
        type: `https://energy-api.example/problems/${this.getType(status)}`,
        title,
        status,
        detail:
          messages[0] ??
          (status === HttpStatus.INTERNAL_SERVER_ERROR
            ? 'Une erreur interne est survenue'
            : title),
        instance: request.originalUrl,
        ...(messages.length > 1 ? { errors: messages } : {}),
      });
  }

  private getType(status: number): string {
    const types: Record<number, string> = {
      400: 'validation-error',
      404: 'not-found',
      409: 'conflict',
      415: 'unsupported-media-type',
      500: 'internal-error',
    };

    return types[status] ?? 'http-error';
  }

  private getTitle(status: number): string {
    const titles: Record<number, string> = {
      400: 'Données invalides',
      404: 'Ressource introuvable',
      409: 'Conflit',
      415: 'Type de média non pris en charge',
      500: 'Erreur interne',
    };

    return titles[status] ?? 'Erreur HTTP';
  }
}
```

En production, ne jamais envoyer la pile d'appels ni les détails internes d'une erreur inattendue.


Pour enregistrer ce filtre globalement il faut ajouter cette configuration : 

`app.useGlobalFilters(new ProblemDetailsFilter());`


## 3. Compléter les DTO de `Buildings`

### `src/buildings/dto/create-building.dto.ts`

```ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Nom unique du bâtiment',
    example: 'Pavillon principal',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({
    message: 'Le nom doit être une chaîne de caractères',
  })
  @IsNotEmpty({
    message: 'Le nom du bâtiment est obligatoire',
  })
  @Length(2, 100, {
    message: 'Le nom doit contenir entre 2 et 100 caractères',
  })
  name: string;

  @ApiProperty({
    description: 'Adresse du bâtiment',
    example: '7000, rue Marie-Victorin, Montréal',
    minLength: 5,
    maxLength: 200,
  })
  @IsString({
    message: "L'adresse doit être une chaîne de caractères",
  })
  @IsNotEmpty({
    message: "L'adresse du bâtiment est obligatoire",
  })
  @Length(5, 200, {
    message: "L'adresse doit contenir entre 5 et 200 caractères",
  })
  address: string;
}
```

## 4. Compléter les DTO de `Rooms`

De la même façon que ce qui a été fait avec Building, valider les attributs de Room.

## 5. Introduire les contrats de persistance

### `src/persistence/repositories/buildings.repository.ts`
### `src/persistence/repositories/rooms.repository.ts`

## 6. Enregistrer les dépôts

### `src/persistence/persistence.module.ts`

```ts
import { Module } from '@nestjs/common';
import { BuildingsRepository } from './repositories/buildings.repository';
import { RoomsRepository } from './repositories/rooms.repository';

@Module({
  providers: [],
  exports: [BuildingsRepository, RoomsRepository],
})
export class PersistenceModule {}
```

### Ajuster services pour utiliser les Repositories

Modifier vos services pour que chacun utilise le Repository correspondant.

## 7. Ajuster controlleurs
Pour iutiliser `ProblemDetailsDto`.

## 8. Contrat HTTP à stabiliser

Complétez le tableau suivant et assurez-vous que votre code implémente le contrat correctement :

| Méthode | Route | Succès | Erreurs principales |
|---|---|---:|---|
| `GET` | `/api/v1/buildings` | xxx | — |
| `POST` | `/api/v1/buildings` | xxx + `Location` | ? |
| `GET` | `/api/v1/buildings/:buildingId` | xxx | ? |
| `PATCH` | `/api/v1/buildings/:buildingId` | xxx | ? |
| `DELETE` | `/api/v1/buildings/:buildingId` | xxx | ? |
| `GET` | `/api/v1/buildings/:buildingId/rooms` | xxx | ? |
| `POST` | `/api/v1/buildings/:buildingId/rooms` | xxx + `Location` | ? |
| `GET` | `/api/v1/buildings/:buildingId/rooms/:roomId` | xxx | ? |
| `PATCH` | `/api/v1/buildings/:buildingId/rooms/:roomId` | xxx | ? |
| `DELETE` | `/api/v1/buildings/:buildingId/rooms/:roomId` | xxx | ? |

Testez chaque route avec chaque code possible (le cas de succès et le/les cas d'erreur(s)).

