Plan de cambios para la página de Nata:

- Agregar un modo oscuro a la página, el cual pueda alternar entre el estilo que tiene actualmente por defecto y un modo oscuro, por medio de un botón dentro de la página.
- Cambiar en la primera pregunta de preguntas frecuentes, la ubicación de Bucaramanga a Ocaña.
- Agregar experiencia en la UCI parte cardio respiratoria, ha trabajado tanto en la UCI de adultos como en la UCI Neo que es donde se encuentra actualmente, inició su experiencia en el Hospital Emiro Quintero Cañizares de Ocaña, esto va desde el inicio de este año hasta ahora (Si sumamos esto, serían 2 años de exp en total, también cambiar eso)
- Agregar una aclaración en la pregunta ¿Qué debo llevara a la primera consulta?, sobre que las mujeres no deben llevar ropa deportiva manga larga, en su preferencia un top deportivo. 
- Ocultar certificaciones y más bien anexar acceso al perfil de LinkedIn para ver estas mismas.
- Cambiar las opiniones de las personas por opiniones reales (explorar la posibilidad de conectarse con google para dejar el comentario directamente en la página, si aún no se puede hacer esta implementación, dejar los comentarios falsos por ahora).
- En la parte de navegación, hay dos botones que llevan a lo mismo "Agendar" y "Agendar Cita", quiero que lo simplifiques a un solo botón
- Me gustaría agregar que en la parte de Reservar tu cita puedas anexar también documentos pdf o archivos png o jpg, así los pacientes pueden subir historias clinicas o las imagenes medicas pertinentes antes de la sesión.
- Quisiera que mejor la Reserva de tu cita se haga directamente enviando un correo y esta petición se conecte directamente a Google Calendar, de modo que a Natalia le salga en su calendario que citas va a tener en el día.
- Cuando se seleccione la hora preferida para la cita, mejor que sean horas predeterminadas, por ejemplo en un horario de 8:00 am a 8:00 pm, pero que entre que las opciones sean cada hora y media, de modo que si hay dos sesiones seguidas y la anterior dura 1h, tiene media hora para desplazarse a la siguiente terapia. Quiero que cuando algún usuario ya haya seleccionado un horario y se haya confirmado la cita, ya ese horario no aparezca disponible, así ellos ya saben que su agenda está ocupada en ese momento.
- Quiero que cuando las personas le den en el botón "Agender este paquete" no los lleve directamente a whatsapp para verificar disponibilidad, sino que los baje al formulario de reservar tu cita y les seleccione directamente el paquete, quiero que el único redireccionamiento hacia whatsapp por ahora sea el de abajo a la derecha de "Escríbeme por Whatsapp", esto con el fin de hacer preguntas o consultas muy puntuales.
- Quiero que la sección de "¿Tienes otra pregunta?" se conecte también a google y envíe un correo directamente al correo de Nata para ella responder, y sino, que puedan hacerlo también por medio de whatsapp, ofreciendo dos alternativas.

---
Cambios Pendientes:

Ahora solo falta configurar las credenciales de Gmail para que el email funcione. Para eso Natalia necesita generar un App Password:

Pasos para Natalia (5 min):

1. Entrar a su cuenta Gmail → Gestionar tu cuenta de Google
2. Seguridad → activar Verificación en dos pasos (si no está activa)
3. Buscar Contraseñas de aplicaciones → crear una nueva
4. Nombre: natalia-fisio → copiar la contraseña de 16 caracteres

Cuando la tengas, la guardamos así en Netlify:

netlify env:set GMAIL_USER nataliabj777@gmail.com
netlify env:set GMAIL_APP_PASSWORD xxxx-xxxx-xxxx-xxxx