# Proyecto: Listado con Remix

Este proyecto es una actividad basada en el tutorial oficial de Remix. Aquí aprenderás a configurar un proyecto básico, trabajar con rutas, loaders, y otros conceptos clave de Remix.

## Instalación

Sigue los siguientes pasos para instalar las dependencias y arrancar el proyecto:

1. **Clona el repositorio**:
   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-repositorio>
   ```

2. **Instala las dependencias**:
   Asegúrate de tener `npm` o `yarn` instalado en tu máquina, y luego ejecuta:
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abre el proyecto en tu navegador**:
   Una vez que el servidor esté corriendo, accede a `http://localhost:3000` para ver tu proyecto.

---

## Conceptos clave

### 1. **Links**
   En Remix, el componente `Link` se utiliza para navegar entre páginas sin recargar la aplicación. Esto proporciona una experiencia rápida y fluida para el usuario.

   **Ejemplo**:
   ```jsx
   import { Link } from "@remix-run/react";

   function Navigation() {
     return (
       <nav>
         <Link to="/">Inicio</Link>
         <Link to="/about">Acerca de</Link>
       </nav>
     );
   }
   ```

### 2. **Loaders**
   Los loaders son funciones especiales que se ejecutan en el servidor para cargar datos antes de renderizar una ruta. Se utilizan para garantizar que la información esté disponible al momento de mostrar la página.

   **Ejemplo**:
   ```jsx
   import { json } from "@remix-run/node";

   export const loader = async () => {
     const data = await fetch("https://api.example.com/items").then(res => res.json());
     return json(data);
   };
   ```

### 3. **Rutas dinámicas**
   En Remix, las rutas dinámicas permiten crear páginas que dependen de parámetros variables, como un ID.

   **Ejemplo**:
   - Archivo: `routes/items/$itemId.jsx`
   - Código:
     ```jsx
     export const loader = async ({ params }) => {
       const { itemId } = params;
       const item = await fetch(`https://api.example.com/items/${itemId}`).then(res => res.json());
       return json(item);
     };

     export default function Item() {
       const data = useLoaderData();
       return <div>{data.name}</div>;
     }
     ```

### 4. **Rutas anidadas**
   Las rutas anidadas permiten crear interfaces jerárquicas, donde una ruta principal puede contener subrutas que se renderizan dentro de un layout.

   **Ejemplo**:
   - Archivo: `routes/dashboard.jsx`
   ```jsx
   import { Outlet } from "@remix-run/react";

   export default function Dashboard() {
     return (
       <div>
         <h1>Dashboard</h1>
         <Outlet />
       </div>
     );
   }
   ```
   - Subruta: `routes/dashboard/stats.jsx`
   ```jsx
   export default function Stats() {
     return <h2>Estadísticas</h2>;
   }
   ```

### 5. **Componente Outlet**
   El componente `Outlet` actúa como un espacio reservado donde se renderizan las subrutas de una ruta principal. Esto es útil para mantener layouts consistentes.

   **Ejemplo**:
   ```jsx
   function AppLayout() {
     return (
       <div>
         <header>Header</header>
         <main>
           <Outlet />
         </main>
         <footer>Footer</footer>
       </div>
     );
   }
   ```

---

## Recursos adicionales
- [Documentación oficial de Remix](https://remix.run/docs)
- [Tutorial oficial](https://remix.run/docs/en/main/start/tutorial)

---