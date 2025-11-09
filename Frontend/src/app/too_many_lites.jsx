
/* --- Example raw data source (orbital elements in km/minutes/degrees) --- */
const RAW_SATELLITES = [
    {
        id: "sat-1",
        label: "Alpha",
        period: 90,
        inclination: 53,
        apogee: 400,
        perigee: 450,
        launchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        scale: 0.0005
    },
    {
        id: "sat-2",
        label: "Bravo",
        period: 100,
        inclination: 97,
        apogee: 399,
        perigee: 430,
        launchDate: new Date().toISOString(),
        scale: 0.004
    },
    {
        period: 120,
        inclination: 30,
        apogee: 500,
        perigee: 505,
        launchDate: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        scale: 0.002
    },
];
export { RAW_SATELLITES };