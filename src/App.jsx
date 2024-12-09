import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Voeg je eigen styling toe of pas de standaardstijl aan

// Helper functie om de kleur voor de regio te bepalen
const getRegionColor = (region) => {
    const regionColors = {
        "Africa": "blue",
        "Americas": "green",
        "Asia": "red",
        "Europe": "yellow",
        "Oceania": "purple",
    };

    return regionColors[region] || "gray";  // Als regio onbekend is, geef een neutrale kleur terug
};

function App() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCountries = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const sortedCountries = response.data.sort((a, b) => a.population - b.population);
            setCountries(sortedCountries);
        } catch (error) {
            console.error("Er is een fout opgetreden:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <img src="src/assets/world_map.png" alt="Wereldkaart" id="worldMap" />
            <button className="button" onClick={fetchCountries} disabled={loading}>
                {loading ? 'Landen laden...' : 'Toon Landen'}
            </button>

            <div className="country-list">
                {countries.length > 0 && countries.map((country, index) => (
                    <div key={index} className="country-card">
                        <div className="country-name" style={{ color: getRegionColor(country.region) }}>
                            {country.name.common}
                        </div>
                        <img src={country.flags.png} alt={`${country.name.common} vlag`} className="flag" />
                        <div className="population">Has a population of {country.population.toLocaleString()} people</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
