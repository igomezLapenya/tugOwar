# Spec: landing-visual

## ADDED Requirements

### Requirement: Landing de la encuesta

La aplicación SHALL mostrar una página pública con la pregunta de adopción de OpenSpec (por defecto "¿Adoptamos OpenSpec?") y una ilustración de una montaña con un escalador que porta una bandera de OpenSpec. La ilustración MUST ser un SVG inline estilizado con Tailwind, sin assets binarios externos.

#### Scenario: Visitante anónimo abre el link

- **WHEN** un usuario anónimo abre la URL de la web
- **THEN** ve la ilustración de la montaña con el escalador y la bandera de OpenSpec, la pregunta de la encuesta y un botón para iniciar sesión con GitHub

#### Scenario: Responsive

- **WHEN** la página se visualiza en móvil o escritorio
- **THEN** la ilustración y la pregunta se muestran legibles y sin scroll horizontal

### Requirement: Estados según sesión y voto

La landing MUST mostrar: (a) opción de login si no hay sesión; (b) botones de voto Sí/No si hay sesión y el usuario no ha votado; (c) el voto actual del usuario y la opción de cambiarlo si ya votó.

#### Scenario: Usuario logueado sin voto

- **WHEN** un usuario autenticado que no ha votado abre la página
- **THEN** ve los botones Sí y No habilitados y no ve el tally

#### Scenario: Usuario logueado que ya votó

- **WHEN** un usuario autenticado que ya votó abre la página
- **THEN** ve marcado su voto actual, puede cambiarlo, y ve el tally agregado
