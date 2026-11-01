const express = require("express");

const app = express();

const PORT = 3000;

// Parse JSON data
app.use(express.json());

// Serve frontend HTML
app.use(express.static("public"));

// Submit form to Flask backend
app.post("/submit", async (req, res) => {
    try {

        const response = await fetch("http://backend:5000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const result = await response.json();

        res.json(result);

    } catch (error) {

        console.error("Backend Error:", error);

        res.status(500).json({
            message: "Unable to connect to Flask backend"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
});