/* ============================================
   Internships & Experience Data — Complete Resume
   ============================================ */

const internshipsData = [
    {
        id: 1,
        role: 'Software Development Intern',
        company: 'TANSAM (Tamil Nadu Government)',
        location: 'Tamil Nadu, India',
        startDate: 'Jan 2026',
        endDate: 'Mar 2026',
        description:
            'Worked on advanced engineering software for 3D model handling and visualization. Implemented XYZ plane grid visualization similar to Autodesk Fusion 360 and optimized workflows for large-scale 3D models.',
        technologies: ['Python', 'STL Processing', '3D Visualization', 'System Design'],
        highlights: [
            'Importing and rendering STL files for 3D inspection',
            'Implemented XYZ plane grid visualization similar to Autodesk Fusion 360',
            'Designed high-performance workflows for large and complex 3D models',
        ],
    },
    {
        id: 2,
        role: 'UI/UX Development Intern',
        company: 'HCLTech',
        location: 'India',
        startDate: 'Dec 2025',
        endDate: 'Jan 2026',
        description:
            'Designed user-centric UI/UX solutions improving usability and visual consistency. Created wireframes and high-fidelity prototypes, applied accessibility standards, and optimized user flows.',
        technologies: ['Figma', 'UI Design Principles', 'Prototyping', 'UX Research'],
        highlights: [
            'Created wireframes and high-fidelity prototypes for enterprise applications',
            'Applied accessibility standards and UX principles for optimized user flows',
            'Iterated designs based on usability considerations and stakeholder feedback',
        ],
    },
    {
        id: 3,
        role: 'Cloud Computing Intern',
        company: 'Kaashiv Infotech',
        location: 'Chennai, India (Offline)',
        startDate: 'Nov 2024',
        endDate: 'Dec 2024',
        description:
            'Gained hands-on experience in scalable cloud deployment, serverless operations, and real-time data handling using AWS and Azure platforms.',
        technologies: ['AWS', 'Azure', 'Serverless Computing', 'Cloud Deployment'],
        highlights: [
            'Deployed scalable cloud solutions using AWS services',
            'Worked with serverless computing architectures',
            'Handled real-time data pipelines in cloud environments',
        ],
    },
    {
        id: 4,
        role: 'Full-Stack Development Intern',
        company: 'DevTown',
        location: 'Online',
        startDate: 'Jan 2024',
        endDate: 'Apr 2024',
        description:
            'Developed responsive full-stack applications, optimized performance, and collaborated using Git, GitHub, and DevOps tools for streamlined deployments.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB'],
        highlights: [
            'Built responsive full-stack web applications from scratch',
            'Optimized application performance and loading times',
            'Used Git, GitHub, and DevOps tools for streamlined deployments',
        ],
    },
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = internshipsData;
}
