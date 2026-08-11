# Spec: github-auth

## ADDED Requirements

### Requirement: Login con GitHub

El sistema SHALL autenticar usuarios mediante GitHub OAuth usando Supabase Auth. El sistema MUST usar el flujo `signInWithOAuth` de `@supabase/supabase-js` con redirect a la aplicación.

#### Scenario: Login exitoso

- **WHEN** un usuario pulsa "Iniciar sesión con GitHub" y autoriza la app en GitHub
- **THEN** GitHub redirige a la aplicación y el usuario queda autenticado con sesión activa

#### Scenario: Login cancelado

- **WHEN** un usuario cancela la autorización en GitHub
- **THEN** vuelve a la aplicación sin sesión y la landing muestra de nuevo la opción de login

### Requirement: Persistencia y cierre de sesión

La sesión SHALL persistir entre recargas del navegador. El sistema SHALL ofrecer una opción de cerrar sesión.

#### Scenario: Recarga con sesión activa

- **WHEN** un usuario autenticado recarga la página
- **THEN** sigue autenticado sin repetir el login

#### Scenario: Cerrar sesión

- **WHEN** un usuario autenticado pulsa "Cerrar sesión"
- **THEN** la sesión se invalida y la landing vuelve al estado anónimo

### Requirement: Identidad del votante

El sistema SHALL identificar cada voto por el `user_id` de Supabase Auth (derivado de la cuenta de GitHub). El sistema MUST NOT almacenar tokens de GitHub en la tabla de votos.

#### Scenario: Identidad estable

- **WHEN** un mismo usuario de GitHub inicia sesión en dos momentos distintos
- **THEN** ambas sesiones comparten el mismo `user_id` y, por tanto, el mismo voto
