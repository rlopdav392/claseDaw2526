# SUPABASE - Usaremos como alternativa para almacenar imágenes:

1. Crear proyecto en Supabase

https://supabase.com/

2. Crear bucket de almacenamiento, lo podéis llamar imágens y ya, y lo ponéis public
   Storage → Buckets

3. Acceso desde front:

Settings => Data API => Project URL
https://isvtklrayzdpvyfnxwic.supabase.co

settings =>API Keys =>anon public

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdnRrbHJheXpkcHZ5Zm54d2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTEzOTEsImV4cCI6MjA3ODA4NzM5MX0.97iMF7rDJopfXxfMIb-6KJD0CffLHSOwifXWEqNqwwE

4. Instalación SDK
   npm install @supabase/supabase-js

5. Crear tres políticas para el bucket "imágenes": para permitir las tres operaciones del bucket: select - insert - delete

# ENTENDIENDO EL STRICT MODE

# Base de datos Firebase

Si tu documento ya tiene el id del producto, mejor para buscarlo más optimo

# UseSWR

Mutate para updates optimistas
Estados automáticos de loading / error / data

# react query

npm install @tanstack/react-query
