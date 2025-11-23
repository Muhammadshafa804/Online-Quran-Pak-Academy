<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form data collect karein
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $course = htmlspecialchars($_POST['course']);
    $message = htmlspecialchars($_POST['message']);
    
    // Aapka email address
    $to = "onlinequranacademy51214@gmail.com";
    
    // Email subject
    $subject = "New Student Inquiry - " . $course;
    
    // Email body
    $body = "
    🌟 New Student Message from Online Quran Academy 🌟
    
    📝 Name: $name
    📧 Email: $email
    📞 Phone: $phone
    📚 Course: $course
    💬 Message: $message
    
    ---
    This message was sent from your website contact form.
    ";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Email send karein
    if(mail($to, $subject, $body, $headers)) {
        // Success - success page par redirect karein
        header("Location: success.html");
        exit();
    } else {
        // Error
        echo "<script>alert('Message failed to send. Please try again.'); window.history.back();</script>";
    }
} else {
    // Direct access - redirect to contact page
    header("Location: contact.html");
    exit();
}
?>
