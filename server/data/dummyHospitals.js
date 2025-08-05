const hospitals = [
    // Original data
    {
        id: 1,
        name: "City General Hospital",
        address: "123 Main Street, Hyderabad",
        diseasesTreated: ["Flu", "Cardiac issue", "General consultation"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Aetna", "UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 2,
        name: "Apollo Hospital",
        address: "456 High Street, Hyderabad",
        diseasesTreated: ["Migraine", "Flu"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 3,
        name: "Max Healthcare",
        address: "789 Park Avenue, Delhi",
        diseasesTreated: ["Cardiac issue", "Migraine"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna", "Cigna", "UnitedHealthcare"],
        city: "Delhi"
    },
    {
        id: 4,
        name: "Global Hospitals",
        address: "101 Cross Road, Delhi",
        diseasesTreated: ["Flu"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Delhi"
    },
    // Extended data for Hyderabad (50+ entries)
    {
        id: 5,
        name: "Medicover Hospitals",
        address: "Road No. 10, Banjara Hills, Hyderabad",
        diseasesTreated: ["Flu", "Dengue", "Typhoid"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna", "Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 6,
        name: "Yashoda Hospitals",
        address: "Raj Bhavan Road, Somajiguda, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Migraine", "Diabetes"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Cigna", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 7,
        name: "Continental Hospitals",
        address: "IT & Financial District, Gachibowli, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Orthopedic", "Neuro"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo", "UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 8,
        name: "KIMS Hospitals",
        address: "Minister Road, Secunderabad, Hyderabad",
        diseasesTreated: ["Flu", "Pneumonia", "Cardiac issue"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Bajaj Allianz", "Cigna"],
        city: "Hyderabad"
    },
    {
        id: 9,
        name: "Virinchi Hospitals",
        address: "Road No. 1, Banjara Hills, Hyderabad",
        diseasesTreated: ["Migraine", "Orthopedic"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Aetna", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 10,
        name: "Basavatarakam Indo-American Cancer Hospital",
        address: "Road No. 14, Banjara Hills, Hyderabad",
        diseasesTreated: ["Cancer"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna", "HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 11,
        name: "Fernandez Hospital",
        address: "Bogulkunta, Abids, Hyderabad",
        diseasesTreated: ["Maternity", "Pediatric"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 12,
        name: "Sunshine Hospitals",
        address: "Paradise Circle, Secunderabad, Hyderabad",
        diseasesTreated: ["Orthopedic", "Neurology"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["UnitedHealthcare", "Cigna"],
        city: "Hyderabad"
    },
    {
        id: 13,
        name: "Care Hospitals",
        address: "Road No. 1, Banjara Hills, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Gastroenterology"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 14,
        name: "Oasis Fertility",
        address: "Road No. 2, Banjara Hills, Hyderabad",
        diseasesTreated: ["Infertility"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 15,
        name: "Rainbow Children's Hospital",
        address: "Road No. 2, Banjara Hills, Hyderabad",
        diseasesTreated: ["Pediatric", "Newborn Care"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Bajaj Allianz", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 16,
        name: "Asian Institute of Gastroenterology",
        address: "Mindspace Road, Gachibowli, Hyderabad",
        diseasesTreated: ["Gastroenterology"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna", "Cigna"],
        city: "Hyderabad"
    },
    {
        id: 17,
        name: "L V Prasad Eye Institute",
        address: "Road No. 2, Banjara Hills, Hyderabad",
        diseasesTreated: ["Ophthalmology"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 18,
        name: "Indus Hospital",
        address: "Kothapet, Hyderabad",
        diseasesTreated: ["Flu", "Migraine"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna"],
        city: "Hyderabad"
    },
    {
        id: 19,
        name: "Sainath Hospital",
        address: "Dilsukhnagar, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Diabetes"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 20,
        name: "Sanjeevani Hospital",
        address: "Uppal, Hyderabad",
        diseasesTreated: ["Flu", "Fever"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 21,
        name: "Challa Hospital",
        address: "Kukatpally, Hyderabad",
        diseasesTreated: ["Orthopedic", "General Surgery"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 22,
        name: "Sagar Hospital",
        address: "Malakpet, Hyderabad",
        diseasesTreated: ["Cardiac issue", "General Consultation"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Aetna", "UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 23,
        name: "BBR Super Speciality Hospital",
        address: "Erragadda, Hyderabad",
        diseasesTreated: ["Neuro", "Cardiac issue"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Star Health"],
        city: "Hyderabad"
    },
    {
        id: 24,
        name: "Geetanjali Hospital",
        address: "L.B. Nagar, Hyderabad",
        diseasesTreated: ["Flu", "Pneumonia"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 25,
        name: "R K Hospital",
        address: "Narayanaguda, Hyderabad",
        diseasesTreated: ["Migraine", "ENT"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 26,
        name: "Olive Hospitals",
        address: "Nampally, Hyderabad",
        diseasesTreated: ["Cardiac issue", "General Surgery"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 27,
        name: "New Life Hospital",
        address: "Chandanagar, Hyderabad",
        diseasesTreated: ["Flu", "Dengue"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Aetna"],
        city: "Hyderabad"
    },
    {
        id: 28,
        name: "Swathi Hospital",
        address: "Ameerpet, Hyderabad",
        diseasesTreated: ["Migraine", "Fever"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 29,
        name: "Krishna Institute of Medical Sciences",
        address: "Secunderabad, Hyderabad",
        diseasesTreated: ["Orthopedic", "Neuro", "Cardiac issue"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Bajaj Allianz", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 30,
        name: "Apollo Clinic",
        address: "Madhapur, Hyderabad",
        diseasesTreated: ["Flu", "General Consultation"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 31,
        name: "Omega Hospital",
        address: "Gachibowli, Hyderabad",
        diseasesTreated: ["Oncology", "Cardiac issue"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Aetna", "Cigna"],
        city: "Hyderabad"
    },
    {
        id: 32,
        name: "Prajay Hospital",
        address: "Begumpet, Hyderabad",
        diseasesTreated: ["Flu", "Migraine"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 33,
        name: "Narayana Hrudayalaya",
        address: "Rethibowli, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Neuro"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 34,
        name: "Sai Ram Hospital",
        address: "Lingampally, Hyderabad",
        diseasesTreated: ["Orthopedic", "General Surgery"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 35,
        name: "AIG Hospitals",
        address: "Mindspace Road, Gachibowli, Hyderabad",
        diseasesTreated: ["Gastroenterology", "Hepatology"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Aetna", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 36,
        name: "Citizens Hospital",
        address: "Nallagandla, Serilingampally, Hyderabad",
        diseasesTreated: ["Multi-Specialty", "Emergency"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 37,
        name: "Siddhartha Hospital",
        address: "Kothapet, Hyderabad",
        diseasesTreated: ["Flu", "Fever", "Infection"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 38,
        name: "Srujana Hospital",
        address: "Chaitanyapuri, Hyderabad",
        diseasesTreated: ["Migraine", "General Consultation"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 39,
        name: "Sakra World Hospital",
        address: "Road No. 1, Banjara Hills, Hyderabad",
        diseasesTreated: ["Neuro", "Orthopedic"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Aetna", "HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 40,
        name: "Pace Hospitals",
        address: "Hitec City, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Gastroenterology"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Cigna", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 41,
        name: "Sai Krishna Hospital",
        address: "Malakpet, Hyderabad",
        diseasesTreated: ["Flu", "Dengue"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Aetna"],
        city: "Hyderabad"
    },
    {
        id: 42,
        name: "Venkataramana Hospital",
        address: "Jubilee Hills, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Diabetes"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 43,
        name: "Vijaya Health Care",
        address: "Abids, Hyderabad",
        diseasesTreated: ["General Surgery", "Flu"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 44,
        name: "Anupama Hospital",
        address: "Nagole, Hyderabad",
        diseasesTreated: ["Orthopedic"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 45,
        name: "Siddiqui Hospital",
        address: "Tolichowki, Hyderabad",
        diseasesTreated: ["Migraine", "ENT"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 46,
        name: "S V Hospital",
        address: "Miyapur, Hyderabad",
        diseasesTreated: ["Cardiac issue", "General Consultation"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Aetna"],
        city: "Hyderabad"
    },
    {
        id: 47,
        name: "Renova Hospital",
        address: "Kompally, Hyderabad",
        diseasesTreated: ["Orthopedic", "Neuro"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Star Health", "UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 48,
        name: "Pranaam Hospital",
        address: "KPHB, Hyderabad",
        diseasesTreated: ["Flu", "Fever"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 49,
        name: "Sana Hospital",
        address: "Mehdipatnam, Hyderabad",
        diseasesTreated: ["Migraine", "Dengue"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 50,
        name: "Akshara Hospital",
        address: "A S Rao Nagar, Hyderabad",
        diseasesTreated: ["Cardiac issue", "General Surgery"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 51,
        name: "Srujana Maternity Hospital",
        address: "Kukatpally, Hyderabad",
        diseasesTreated: ["Maternity"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Aetna", "Star Health"],
        city: "Hyderabad"
    },
    {
        id: 52,
        name: "Ozone Hospitals",
        address: "Attapur, Hyderabad",
        diseasesTreated: ["Orthopedic", "Flu"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["UnitedHealthcare"],
        city: "Hyderabad"
    },
    {
        id: 53,
        name: "S V N Super Speciality Hospital",
        address: "Uppal, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Migraine"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["HDFC Ergo", "Bajaj Allianz"],
        city: "Hyderabad"
    },
    {
        id: 54,
        name: "Vasishta Hospital",
        address: "Kachiguda, Hyderabad",
        diseasesTreated: ["General Consultation", "Fever"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Cigna"],
        city: "Hyderabad"
    },
    {
        id: 55,
        name: "New Vision Hospital",
        address: "Dilsukhnagar, Hyderabad",
        diseasesTreated: ["Migraine", "ENT"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Aetna"],
        city: "Hyderabad"
    },
    {
        id: 56,
        name: "Preeti Urology & Kidney Hospital",
        address: "KPHB, Hyderabad",
        diseasesTreated: ["Urology"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Star Health"],
        city: "Hyderabad"
    },
    {
        id: 57,
        name: "Sravani Hospital",
        address: "Madhapur, Hyderabad",
        diseasesTreated: ["Flu", "Dengue"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["UnitedHealthcare", "HDFC Ergo"],
        city: "Hyderabad"
    },
    {
        id: 58,
        name: "Aditya Hospital",
        address: "Lakdikapul, Hyderabad",
        diseasesTreated: ["Cardiac issue", "Neuro"],
        schemesAccepted: ["PMJAY"],
        insurancePartners: ["Bajaj Allianz", "Cigna"],
        city: "Hyderabad"
    },
    {
        id: 59,
        name: "Sai Krishna Neuro Hospital",
        address: "Kompally, Hyderabad",
        diseasesTreated: ["Neuro"],
        schemesAccepted: ["Arogyasri"],
        insurancePartners: ["Aetna"],
        city: "Hyderabad"
    },
    {
        id: 60,
        name: "Prime Hospitals",
        address: "Kukatpally, Hyderabad",
        diseasesTreated: ["Orthopedic", "General Surgery"],
        schemesAccepted: ["Arogyasri", "PMJAY"],
        insurancePartners: ["Star Health"],
        city: "Hyderabad"
    },
];

module.exports = hospitals;