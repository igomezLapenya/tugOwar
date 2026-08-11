# Spec: poll-results

## ADDED Requirements

### Requirement: Tally agregado tras votar

El sistema SHALL mostrar el recuento agregado de votos (totales de Sí y No) únicamente a usuarios autenticados que ya han votado. El tally MUST obtenerse mediante la función RPC `get_poll_results()`, que devuelve solo agregados y no filas individuales.

#### Scenario: Ver tally tras votar

- **WHEN** un usuario autenticado emite su voto
- **THEN** inmediatamente ve el recuento total de Sí y No actualizado

#### Scenario: Usuario que ya votó vuelve a entrar

- **WHEN** un usuario que ya votó abre la página en una nueva visita
- **THEN** ve el tally actualizado sin necesidad de volver a votar

### Requirement: Ocultación de resultados antes de votar

El sistema MUST NOT mostrar el tally a usuarios anónimos ni a usuarios autenticados que aún no han votado.

#### Scenario: Autenticado sin voto

- **WHEN** un usuario autenticado que no ha votado abre la página
- **THEN** no ve ningún recuento de resultados

#### Scenario: Anónimo

- **WHEN** un usuario anónimo abre la página
- **THEN** no ve ningún recuento de resultados

### Requirement: Privacidad de votos individuales

El sistema MUST NOT exponer a través de la UI qué usuario votó qué. La RPC SHALL ser de solo lectura de agregados.

#### Scenario: Sin fuga de votos individuales

- **WHEN** cualquier usuario consulta los resultados
- **THEN** solo recibe conteos agregados, sin identidades ni votos individuales
