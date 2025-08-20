import React, { useState } from "react";
import NavigationBar from "./components/Navbar";
import { Container, Button, Card, Badge, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileImage from "./assets/profile.jpg";
import resumePDF from "./assets/shivomResume.pdf";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://ritik-portfolio.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!", { autoClose: 5000 });
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        toast.error(result.error || "Failed to send message", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      style={{ scrollBehavior: "smooth", minHeight: "100vh" }}
    >
      <NavigationBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <ToastContainer position="top-center" />

      {/* Home */}
      <section
        id="home"
        className="text-center pt-5"
        style={{ paddingTop: "100px" }}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-circle mb-3"
          style={{ width: "180px", height: "180px", objectFit: "cover" }}
        />
        <h1>Welcome to My Portfolio</h1>
        <p>I am a Full Stack Developer</p>
        <Button href={resumePDF} download="shivomResume.pdf" className="mt-2">
          Download Resume
        </Button>
        <div className="mt-3 d-flex justify-content-center gap-3">
  <Button
    variant="outline-primary"
    href="https://www.linkedin.com/in/shivom-sharma-0a6252240"
    target="_blank"
  >
    LinkedIn
  </Button>
  <Button
  variant={darkMode ? "light" : "outline-dark"}
  href="https://github.com/ShivomSharma2000"
  target="_blank"
>
  GitHub
</Button>
</div>
      </section>

      {/* Rest of your code remains the same */}
      {/* About */}
      <section id="about" className="pt-5">
        <Container>
          <h2>About Me</h2>
          <p>
            I'm Shivom, a passionate Software Engineer with experience in React,
            Node.js, and full-stack development.
          </p>
        </Container>
        <Container>
          <h2>Experience</h2>
          <p>
           At Deftsoft Informatics, Mohali (June 2024 – Present), I have been working as a MERN Stack Developer, where I design and deploy full-stack web applications using MongoDB, Express.js, React.js, and Node.js. I have developed responsive user interfaces and implemented seamless API integrations, while also engineering real-time communication, location-based services, and e-commerce features to enhance performance and user engagement. Additionally, I have integrated Next.js with Supabase for server-side rendering and backend scalability, significantly improving application speed. My role also involves collaborating with cross-functional teams to deliver end-to-end solutions, from frontend development to backend API design, ensuring efficient workflows and timely project delivery.
          </p>
        </Container>
      </section>

      {/* Projects */}
      <section id="projects" className="pt-5">
        <Container>
          <h2>Projects</h2>
          <div className="row">
            {[
              {
                title: "Job Marketplace Platform (MERN)",
                desc: "Developed a platform with three user roles: Customer, Service Provider, and Admin. Customers can create job listings, receive bids from multiple service providers, and hire based on profile evaluations. The system includes real-time chat with support for group messages, image and PDF sharing, message deletion, and a post-project review and rating feature."
              },
              {
                title: "Football Academy & E-commerce Website (MERN)",
                desc: " Created a comprehensive platform for football academies with admin and user roles. Admins can manage frontend content, create and locate schools using Google Maps API, and handle a full ecommerce system. Users can search for nearby schools by location, view distances, browse products, manage multiple addresses, place orders, and apply coupons or gift cards created by the admin.  "
              },
              {
                title: "Drag-and-Drop Game (MERN)",
                desc: "Built an interactive platform offering multiple drag-and-drop games. Each game has unique logic while maintaining a consistent user interface. Focused on providing engaging user experiences and seamless gameplay within a React-based front end."
              },
              {
                title: "Mini Project (Next.js, Supabase)",
                desc: "Developed a lightweight web application using Next.js for server-side rendering and Supabase for authentication and data storage. Focused on creating a fast and efficient backend-connected frontend with modern tooling."
              },
            ].map((proj, idx) => (
              <div className="col-md-6" key={idx}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{proj.title}</Card.Title>
                    <Card.Text>{proj.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section id="skills" className="pt-5">
        <Container>
          <h2>Skills</h2>
          {[
            "React.js",
            "Node.js",
            "Express.js",
            "Next.js",
            "MongoDB",
            "Supabase",
            "JavaScript"
          ].map((skill, idx) => (
            <Badge key={idx} bg="info" className="me-2 mb-2">
              {skill}
            </Badge>
          ))}
        </Container>
      </section>
      {/* Certifications */}
      <section id="certifications" className="pt-5">
        <Container>
          <h2>Certifications</h2>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li className="mb-2">
              <Badge bg="success" className="me-2">
                React.js
              </Badge>
              Springboard by Infosys
            </li>
            <li className="mb-2">
              <Badge bg="success" className="me-2">
                Node.js
              </Badge>
              Springboard by Infosys
            </li>
            <li className="mb-2">
              <Badge bg="secondary" className="me-2">
                Front-end Development
              </Badge>
              Front-End Development from Meta
            </li>
          </ul>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="pt-5 pb-5">
        <Container>
          <h2>Contact Me</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Form>
        </Container>
      </section>

      {/* Footer / Instagram */}
<footer className="text-center py-4 border-top">
  <p>
    © {new Date().getFullYear()} Shivom |{" "}
    <a
      href="https://www.instagram.com/shivom_sharma_banka__/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: darkMode ? "#fff" : "#000" }}
    >
      Instagram
    </a>
  </p>
</footer>

    </div>
  );
}

export default App;
