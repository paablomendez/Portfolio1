document.addEventListener('DOMContentLoaded', () => {
    // 1. Desplazamiento suave al hacer clic en los enlaces del menú
    document.querySelectorAll('.menu-list a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste para compensar la altura del menú
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            document.getElementById('menu-toggle').checked = false;
        });
    });

    // 2. Animación de aparición de elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {threshold: 0.1});
    
    // Observar todos los elementos que queremos animar
    document.querySelectorAll('.proyecto, .experiencia, .grid-sobremi > div, .foto-perfil, .presentacion, .formulario-contacto')
        .forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    
    // 3. Efecto de tipografía animada para la presentación
    if (document.querySelector('.presentacion h1')) {
        const text = document.querySelector('.presentacion h1').textContent;
        const nameElement = document.querySelector('.presentacion h1');
        nameElement.textContent = '';
        
        // Función para escribir texto letra por letra
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar animación después de un pequeño retraso
        setTimeout(typeWriter, 500);
    }

    // 4. Validación del formulario con feedback visual
    const contactForm = document.querySelector('.formulario-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            let isValid = true;
            const formInputs = this.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    markAsInvalid(input, 'Este campo es obligatorio');
                    isValid = false;
                } else {
                    markAsValid(input);
                }
                
                // Validación específica para email
                if (input.type === 'email' && input.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        markAsInvalid(input, 'Por favor, introduce un email válido');
                        isValid = false;
                    }
                }
            });
            
            // Si todo es válido, mostrar mensaje de éxito
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Simulación de envío (reemplazar con tu lógica de envío real)
                setTimeout(() => {
                    // Mostrar mensaje de éxito
                    const successMessage = document.createElement('div');
                    successMessage.className = 'mensaje-exito';
                    successMessage.textContent = '¡Mensaje enviado con éxito!';
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    
                    // Opcional: restaurar el formulario después de un tiempo
                    /* setTimeout(() => {
                        location.reload();
                    }, 3000); */
                }, 1500);
            }
        });
        
        // Limpiar mensajes de error al escribir
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    markAsValid(this);
                }
            });
        });
    }
    
    function markAsInvalid(input, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        
        // Crear o actualizar mensaje de error
        let errorMessage = input.parentElement.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            input.parentElement.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }
    
    function markAsValid(input) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        
        // Eliminar mensaje de error si existe
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});