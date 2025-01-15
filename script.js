document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const thumbnailWrapper = document.querySelector('.thumbnail-wrapper');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const mainImage = document.getElementById('mainImage');
    let currentPosition = 0;
    const thumbnailHeight = 48; // Height of thumbnail + margin

    function updateCarousel() {
        thumbnailWrapper.style.transform = `translateY(-${currentPosition * thumbnailHeight}px)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPosition < thumbnails.length - 4) {
            currentPosition++;
            updateCarousel();
        }
    });

    // Thumbnail click handling
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            // Update main image
            mainImage.src = thumbnail.getAttribute('data-main');
        });
    });

    // Image zoom functionality
    const zoomLens = document.getElementById('zoomLens');
    const zoomedImage = document.getElementById('zoomedImage');
    const mainImageContainer = document.querySelector('.main-image-container');

    mainImageContainer.addEventListener('mousemove', function(e) {
        const rect = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        zoomLens.style.display = 'block';
        zoomedImage.style.display = 'block';
        
        zoomLens.style.left = `${x - 50}px`;
        zoomLens.style.top = `${y - 50}px`;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        zoomedImage.style.backgroundImage = `url(${mainImage.src})`;
        zoomedImage.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        zoomedImage.style.backgroundSize = '400%';
    });

    mainImageContainer.addEventListener('mouseleave', function() {
        zoomLens.style.display = 'none';
        zoomedImage.style.display = 'none';
    });

    // Email modal functionality
    const modal = document.getElementById('emailModal');
    const emailButton = document.getElementById('emailButton');
    const closeButton = document.querySelector('.close');
    const emailForm = document.getElementById('emailForm');

    emailButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const toEmail = document.getElementById('toEmail').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Here you would typically send this to your backend
        // For demonstration, we'll use mailto
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;

        // Close the modal
        modal.style.display = 'none';
        emailForm.reset();
    });

    // Variant buttons functionality
    const variantButtons = document.querySelectorAll('.variant-button');
    variantButtons.forEach(button => {
        button.addEventListener('click', () => {
            variantButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
});