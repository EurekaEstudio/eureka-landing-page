# Guía Maestra de Rendimiento Frontend para el Skill de Google Antigravity

## 1. Contexto Estratégico: El Vibe Coding y la Optimización de Alto Nivel

La era del **Vibe Coding** ha transformado el rol del desarrollador de un ejecutor de sintaxis a un **Arquitecto de Decisiones Estratégicas**. En el ecosistema de Google Antigravity, el código se ha vuelto un recurso barato y abundante, pero la arquitectura y la eficiencia siguen siendo invaluables. Un Skill de rendimiento no debe ser un simple generador de componentes; debe actuar como un guardián de la infraestructura técnica, operando bajo la premisa de que la IA amplifica la intención: si la dirección es mediocre, la IA escalará la mediocridad.

Para que este Skill opere con precisión quirúrgica, debe procesar las instrucciones bajo el concepto de **Modelo de Computación Predictiva (PCM)**. Según los fundamentos de Juan Andrés Núñez, el éxito no radica en "pedir código", sino en diseñar el contexto. El Skill debe basarse en estos principios imperativos:

*   **Estructuración de Contexto Quirúrgico:** Los LLM predicen tokens basándose en el contexto provisto. El Skill debe inyectar restricciones técnicas (budgets) antes de cualquier generación.
*   **Enfoque en Inferencia Eficiente:** Minimizar las "inferences" innecesarias mediante prompts de alta densidad informativa para reducir costes y latencia.
*   **Validación de Presupuestos de Rendimiento:** El Skill tiene la orden de rechazar o refactorizar automáticamente cualquier bloque de código que no cumpla con las métricas de Core Web Vitals predefinidas.

---

## 2. Diagnóstico de Rendimiento: Core Web Vitals y Métricas Críticas

En el horizonte 2025-2026, las Core Web Vitals (CWV) son el estándar absoluto. El Skill de Antigravity no solo debe conocerlas, sino **hacerlas cumplir**. Ignorar estas métricas es inaceptable: el 50% de los usuarios abandonan sitios que tardan más de 3 segundos en ser interactivos.

### Tabla de Umbrales de Rendimiento (Lighthouse 2026)

| Métrica | Umbral "Bueno" | Causa Raíz de Degradación | Acción del Skill |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | < 2.5s | Imágenes pesadas, render-blocking JS/CSS. | Forzar WebP/AVIF y `fetchpriority`. |
| **CLS** (Cumulative Layout Shift) | < 0.1 | `authored dimension: none` en imágenes/ads. | Inyectar `aspect-ratio` obligatorio. |
| **INP** (Interaction to Next Paint) | < 200ms | Tareas largas (>50ms) en el hilo principal. | Fragmentar JS y usar Web Workers. |
| **TTI** (Time to Interactive) | < 10s (en 3G) | Bundles > 5,000 KiB (Payload enorme). | Flag automático a bundles > 250KB gzip. |

### Algoritmo Lógico para Identificar Layout Shifts
El Skill debe seguir este flujo diagnóstico para eliminar la inestabilidad visual:

1.  **Simulación de Entorno:** Ejecutar trazas con *CPU throttling* (4x o 6x) y red "Fast 3G".
2.  **Agrupación en Session Windows:** Identificar ráfagas de cambios rápidos. El Skill debe priorizar siempre el **Largest Contentful Window** (la ventana con el mayor impacto acumulado).
3.  **Detección de "Authored Dimension":** Localizar elementos con dimensiones no definidas en el código fuente (causa primaria del shift).
4.  **Análisis de Movimiento:** Cuantificar el desplazamiento de nodos impactados y asignar el correctivo (e.g., reservar espacio en el DOM mediante CSS *containment*).

---

## 3. Arquitecturas de Renderizado: Evolución hacia el Zero Client-Side JS

La elección de la arquitectura es la decisión de rendimiento más crítica. El Skill debe recomendar el modelo basándose en la necesidad de SEO e interactividad.

### Matriz de Estrategias de Arquitectura

| Estratégia | Impacto TTFB | Carga de JS en Cliente | Caso de Uso Ideal |
| :--- | :--- | :--- | :--- |
| **CSR** (Client-Side) | Lento (espera JS) | Máxima | Dashboards privados de alta interacción. |
| **SSR** (Server-Side) | Rápido | Alta (Hidratación pesada) | E-commerce con inventario dinámico. |
| **SSG** (Static Gen) | Instantáneo | Moderada | Marketing, blogs y documentación. |
| **ISR** (Incremental) | Instantáneo | Moderada | Catálogos de escala masiva (E-commerce). |
| **RSC** (React Server Comp) | Muy Rápido | **Mínima / Cero** | Aplicaciones React 19 que eliminan JS cliente. |
| **Resumability** (Qwik) | Instantáneo | **Casi Cero** | Apps que "resumen" ejecución sin hidratar. |

**Profundización Técnica:** El Skill debe priorizar **React Server Components (RSC)** cuando se busca eliminar el JS del cliente en partes no interactivas. A diferencia de la hidratación tradicional de React —que re-ejecuta lógica en el cliente—, frameworks como **Qwik** utilizan **Resumability**, permitiendo que la app continúe exactamente donde el servidor la dejó, logrando una interactividad instantánea sin descargar el árbol de componentes completo.

---

## 4. Gestión de Estado y Reactividad: La Precisión de los Signals

La reactividad moderna exige granularidad. El Skill debe alertar sobre los riesgos del re-renderizado masivo: **un solo `useCallback` omitido puede disparar 47,000 re-renders innecesarios por minuto** en aplicaciones de alta escala.

*   **React 19 & React Compiler ("Forget"):** El Skill debe informar que, con el nuevo compilador, la memoización manual (`useMemo`, `useCallback`) es procesada automáticamente, reduciendo la carga cognitiva del desarrollador.
*   **Signals (Preact/Solid):** Representan el pináculo de la eficiencia. Los Signals actualizan de forma "quirúrgica" el DOM (modificando `element.nodeValue` directamente) saltándose la reconciliación del Virtual DOM. Son hasta **10 veces más rápidos** en interfaces con actualizaciones de alta frecuencia.

### Reglas de Oro de Reactividad para el Skill:
1.  **Brotli sobre Gzip:** El Skill debe configurar la compresión Brotli por defecto (ofrece un **17% de ahorro** extra en JS frente a Gzip).
2.  **Virtualización Mandatoria:** Cualquier lista > 100 elementos debe usar `react-window` o `vue-virtual-scroller`.
3.  **Fragmentación de Contexto:** Dividir contextos globales pesados en proveedores pequeños (`UserContext`, `ThemeContext`) para limitar el alcance de las actualizaciones.

---

## 5. Accesibilidad (A11y) y Estructura Semántica

La accesibilidad es un pilar de la reputación de marca y el SEO. El Skill debe generar componentes que cumplan con los estándares WCAG 2.1 AA.

### Checklist Imperativo de Implementación:
*   **Semántica Estructural:** Uso estricto de `<main>`, `<nav>`, `<section>` y `<article>`. Prohibir el uso de `<div>` para elementos interactivos.
*   **Asociación Programática:** Los campos de formulario deben estar vinculados a sus etiquetas mediante el atributo `for/id`.
*   **Gestión de Foco:** Implementar *focus traps* en modales y asegurar un orden de tabulación lógico.
*   **Atributos ARIA:** Usar `aria-label`, `aria-expanded` y `aria-live` solo cuando el HTML nativo sea insuficiente.
*   **Contraste y Multimedia:** Relación de contraste mínima de 4.5:1 y textos `alt` descriptivos (no redundantes).

---

## 6. Manual de Vibe Coding: Ingeniería de Prompts para Antigravity

Como Arquitecto de Prompts, tu misión es dirigir la IA hacia la eficiencia extrema. El Skill debe "conocer" estos términos para evitar alucinaciones.

### Glosario Técnico del Skill
*   **Tokens:** Unidad mínima de procesamiento. Menos tokens = menor latencia de respuesta.
*   **Few-shot Learning:** Técnica de proporcionar 2 o 3 ejemplos de entrada/salida para marcar el patrón de diseño.
*   **RAG (Retrieval Augmented Generation):** Inyección de documentación técnica o sistemas de diseño (UI Kits) en el contexto de la IA.
*   **Temperature (0.1 - 0.3):** Ajuste imperativo para tareas de refactorización; garantiza previsibilidad y minimiza la "creatividad" innecesaria.
*   **Hallucination:** Riesgo de que la IA invente librerías. El Skill debe validar la existencia de paquetes en `npm` antes de sugerirlos.

### Patrones de Instrucción Senior (Few-shot Prompting)

**Ejemplo 1: Optimización de Activos (LCP)**
> "Actúa como Senior Performance Engineer. Refactoriza el componente `HeroImage` para maximizar el LCP. Implementa `srcset` para resoluciones dinámicas, prioriza formato AVIF con fallback a WebP, y asigna `fetchpriority='high'`. El código debe incluir `aspect-ratio` para evitar CLS."

**Ejemplo 2: Reducción de Bundle (Tree-shaking)**
> "Analiza este módulo e identifica dependencias que no soportan tree-shaking. Sustitúyelas por alternativas ligeras o implementa importaciones dinámicas (`React.lazy`) para asegurar que el bundle inicial no supere los 250KB gzip."

**Ejemplo 3: Normalización de Estado Complejo (Escalabilidad)**
> "Convierte la lógica de estado de este componente de 'lista anidada' a una estructura normalizada utilizando `createEntityAdapter` de Redux Toolkit. El objetivo es evitar el costo computacional de recorrer arrays en cada actualización y asegurar búsquedas O(1) por ID para mejorar el rendimiento de renderizado en listas de alta escala."

---

## 7. Conclusión y Herramientas de Auditoría

En el desarrollo asistido por IA, la velocidad de generación no sustituye la calidad de la ejecución. El Skill de Antigravity debe ser el validador final que asegure que cada línea de código contribuya a una experiencia de usuario fluida y accesible.

### Stack de Validación Obligatorio:
*   **Lighthouse CI:** Integrado en el flujo de PR para bloquear despliegues que degraden las CWV.
*   **Webpack Bundle Analyzer:** Para detectar "bloat" y dependencias fantasma.
*   **Sentry RUM (Real User Monitoring):** Para medir la experiencia real en dispositivos de gama baja y redes 3G (donde el TTI debe mantenerse < 10s).
*   **Chrome DevTools (Coverage Panel):** Para identificar y eliminar JS no utilizado en el primer renderizado.

**Directiva Final:** El código es efímero; la arquitectura es la que sobrevive. Diseña siempre para el peor dispositivo y la conexión más lenta.