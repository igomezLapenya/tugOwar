# Spec: poll-voting

## ADDED Requirements

### Requirement: Emitir voto

Un usuario autenticado SHALL poder votar Sí o No a la pregunta de adopción de OpenSpec. El voto MUST persistirse en la tabla `votes` de Supabase con el `user_id` del votante, el valor del voto y timestamp.

#### Scenario: Primer voto

- **WHEN** un usuario autenticado que no ha votado pulsa "Sí" o "No"
- **THEN** se inserta su voto, los botones quedan deshabilitados durante la petición, y tras confirmarse se muestra su voto registrado

#### Scenario: Usuario anónimo no puede votar

- **WHEN** un usuario sin sesión intenta votar
- **THEN** la UI no ofrece botones de voto y cualquier inserción directa es rechazada por RLS

### Requirement: Unicidad del voto

El sistema MUST garantizar un máximo de un voto por usuario mediante `user_id` como clave primaria de `votes`.

#### Scenario: Doble envío

- **WHEN** un usuario envía dos votos en rápida sucesión (doble click)
- **THEN** la base de datos mantiene una única fila para ese usuario

### Requirement: Cambio de voto

Un usuario que ya votó SHALL poder cambiar su voto. El sistema MUST registrar el cambio con un upsert sobre `user_id`, actualizando `vote` y `updated_at`; el último voto cuenta.

#### Scenario: Cambiar de Sí a No

- **WHEN** un usuario que votó "Sí" pulsa "No"
- **THEN** su fila se actualiza a "No" y el tally refleja el cambio (un sí menos, un no más)

#### Scenario: Aislamiento entre usuarios

- **WHEN** un usuario intenta leer o modificar el voto de otro usuario
- **THEN** RLS lo impide: solo puede leer y escribir su propia fila
