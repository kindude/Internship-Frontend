import React from "react";


const CompaniesListPage: React.FC = () => {

    const companies = [
        { id: 1, name: 'Microsoft', location:'Washington D.C.' },
        { id: 2, name: 'Google', location: 'Chicago' },
        { id: 3, name: 'Apple', location: 'Boston' }
    ];

    return (
        <div>
            <h1>Companies List</h1>
            <ul>
                {
                    companies.map(company => (
                        <li key={company.id}>{company.name} {company.location}</li>
                    ))
                    }
            </ul>
        </div>
    );
};

export default CompaniesListPage;