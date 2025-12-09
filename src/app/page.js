'use client';

import React, { useState, useEffect } from 'react';
import {
  Scale,
  Phone,
  Menu,
  X,
  Car,
  Smartphone,
  BriefcaseMedical,
  HardHat,
  User,
  ShieldAlert,
  ChevronRight,
  Globe,
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Gavel,
  Award,
  Ship,
  Bus,
  Brain,
  Users,
  Pill,
  Syringe,
  FlaskConical,
  PackageX,
  Droplets,
  Star,
  Quote,
  Calendar,
  Clock as ClockIcon
} from 'lucide-react';

// --- CONFIGURATION ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZyFCki8SRj1zCWMLguyxKWI31WZlaoIVVRbZC-snUxYphFeOsN63gaPy4KHXYl8QTCQ/exec";
const ACCESS_KEY = "bd059ed0-3d31-4877-b768-50ba79857be9";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// --- COOKIE HELPERS ---
const setCookie = (name, value, days) => {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
};

const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return null;
};

// Structure definition for mapping icons and IDs
const CATEGORY_STRUCT = [
  { id: 'cat-vehicle', icon: Car },
  { id: 'cat-products', icon: PackageX },
  { id: 'cat-injury', icon: BriefcaseMedical },
];

const AREA_STRUCT = [
  { id: 'car-accidents', categoryId: 'cat-vehicle', icon: Car },
  { id: 'motorcycle', categoryId: 'cat-vehicle', icon: HardHat },
  { id: 'commercial', categoryId: 'cat-vehicle', icon: ShieldAlert },
  { id: 'boating', categoryId: 'cat-vehicle', icon: Ship },
  { id: 'bus', categoryId: 'cat-vehicle', icon: Bus },
  { id: 'rideshare', categoryId: 'cat-vehicle', icon: Smartphone },
  { id: 'pedestrian', categoryId: 'cat-vehicle', icon: User },
  { id: 'passenger', categoryId: 'cat-vehicle', icon: Users },
  { id: 'slip-fall', categoryId: 'cat-injury', icon: BriefcaseMedical },
  { id: 'construction', categoryId: 'cat-injury', icon: HardHat },
  { id: 'brain', categoryId: 'cat-injury', icon: Brain },
  { id: 'mesh', categoryId: 'cat-products', icon: GridIcon },
  { id: 'hair', categoryId: 'cat-products', icon: Droplets },
  { id: 'roundup', categoryId: 'cat-products', icon: FlaskConical },
  { id: 'talc', categoryId: 'cat-products', icon: PackageX },
  { id: 'ozempic', categoryId: 'cat-products', icon: Pill },
  { id: 'truvada', categoryId: 'cat-products', icon: Syringe },
];

function GridIcon({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

// --- Translations ---
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", practiceAreas: "Practice Areas", results: "Case Results", contact: "Contact Us", freeConsult: "Free Consultation" },
    hero: {
      subSlogan: "Relentless representation for injury victims. You don't pay unless we win.",
      stat1: "$1 Billion+", stat1Label: "Recovered",
      slogans: [
        { l1: "Billions Won.", l2: "We Win." },
        { l1: "No Fee.", l2: "Until We Win." },
        { l1: "Call Us Before 911.", l2: "We Can Win." },
        { l1: "Justice For Your Injury.", l2: "Peace For Your Mind." }
      ]
    },
    form: {
      title: "Free Case Evaluation",
      subtitle: "Our office will reach out to you within 24 hours.",
      nameLabel: "Full Name",
      phoneLabel: "Phone Number",
      emailLabel: "Email Address",
      stateLabel: "State of Accident",
      dateLabel: "Date of Accident",
      timeLabel: "Time of Accident",
      accidentLabel: "Describe the Accident",
      injuryLabel: "Type of Injury",
      submitBtn: "Submit",
      disclaimer: "*By pressing 'Submit' you Consent to Receive Calls and SMS Notifications.",
      sending: "Sending...",
      success: "Request Sent Successfully!",
      error: "Error. Please try again."
    },
    sections: { areasTitle: "Our Practice Areas", areasSubtitle: "Select a category to view specific case types", viewAll: "View All Cases", learnMore: "Learn More", whyUs: "Why Choose Car Accident Attorneys?", callToAction: "Don't Wait. Justice Delayed is Justice Denied." },
    footer: { copyright: "© 2025 Car Accident Attorneys. All Rights Reserved.", mainOffice: "Main Office", newClients: "New Clients" },
    testimonials: {
      title: "Client Success Stories",
      subtitle: "See what our clients say about us on Google.",
      googleRating: "5.0 Stars on Google",
      reviews: [
        { name: "Elizabeth Gonzalez", text: "I got into an accident in April where it was deemed the other parties's fault and was recommended Parke Injury Law Offices. My case has been concluded on the 18th of November and I've received my settlement. It was nearly double of what was anticipated..." },
        { name: "Annie Smith", text: "I had a great experience with Parke Injury Law Firm after my car accident. From start to finish, they made a stressful situation so much easier to handle. JB and Chase were incredibly helpful! Always professional..." },
        { name: "Veronica Salazar", text: "We had a great experience working with this accident attorney office. Chase, Margarth, and the entire team were incredibly helpful with my husband's case. They worked hard to ensure we got the best possible outcome..." },
        { name: "Sang Hwi Lee", text: "I am beyond grateful for the exceptional service I received from Parke Injury Law Firm during my personal injury case. From the very first consultation to the final resolution, the team demonstrated professionalism..." },
        { name: "Ahmed Galal", text: "Parke law firm is the most professional lawyers in traffic accident as I ran into a hit and run accident in may 2020 all I had is a picture of that guy license plates and they were able to find him with LVMPD..." }
      ]
    },
    detailPage: {
      introPart1: "At Car Accident Attorneys, we specialize in",
      introPart2: "cases. If you or a loved one has been injured, you need an aggressive team that understands the complexities of these specific claims.",
      whyTitle: "Why You Need Representation",
      whyText: "Insurance companies and large corporations have teams of lawyers working to deny or minimize your claim. Without strong legal representation, you are at a disadvantage. We level the playing field.",
      commitTitle: "Our Commitment to You:",
      commitments: ["Zero Upfront Costs", "Medical Care Coordination", "Property Damage Assistance", "Lost Wage Recovery", "Maximum Compensation", "Trial Preparation"],
      aboutTitle: "About This Claim",
      aboutText: "We investigate every detail of your case. From gathering surveillance footage to hiring accident reconstruction experts or medical specialists, we leave no stone unturned to prove liability and damages.",
      whatToDoTitle: "What To Do After an Accident",
      howWeHelpTitle: "How We Can Help"
    },
    categories: { 'cat-vehicle': { title: 'Motor Vehicle Accidents', desc: 'Cars, Trucks, Motorcycles, and more.' }, 'cat-products': { title: 'Dangerous Products', desc: 'Defective drugs, medical devices, and consumer products.' }, 'cat-injury': { title: 'Personal Injury', desc: 'Slips, falls, brain injuries, and general negligence.' } },
    areas: {
      'car-accidents': {
        title: 'Auto Accidents',
        desc: 'Expert legal representation.',
        whatToDo: "1. Call 911 immediately.\n2. Seek medical attention, even if you feel fine.\n3. Gather evidence: photos of the scene, witness contact info.\n4. Exchange insurance information.\n5. Do NOT give a recorded statement to the other driver's insurance.\n6. Call Car Accident Attorneys.",
        howWeHelp: "We handle all communication with insurance companies, ensuring you don't say anything that could hurt your claim. We investigate the crash, prove liability, and fight for maximum compensation for your medical bills, lost wages, and pain and suffering."
      },
      'motorcycle': {
        title: 'Motorcycle Accidents',
        desc: 'Protecting riders against negligent drivers.',
        whatToDo: "1. Move to safety if possible.\n2. Call police and paramedics.\n3. Keep your helmet and gear as evidence.\n4. Take photos of road conditions and vehicle damage.\n5. Contact an attorney before speaking to insurance.",
        howWeHelp: "Motorcyclists often face bias from insurance companies. We fight to prove that the other driver was at fault. We understand the unique dynamics of motorcycle accidents and the severe injuries that can result."
      },
      'commercial': {
        title: 'Truck Accidents',
        desc: 'Complex litigation involving semi-trucks.',
        whatToDo: "1. Call 911.\n2. Get the truck driver's CDL number, company name, and insurance.\n3. Take photos of the truck's DOT number.\n4. Do not sign anything from the trucking company.",
        howWeHelp: "Trucking cases involve federal regulations and multiple liable parties (driver, company, loader). We send spoliation letters to preserve black box data and driver logs to prove negligence."
      },
      'boating': {
        title: 'Boating Accidents',
        desc: 'Injuries on lakes and waterways.',
        whatToDo: "1. Check for injuries and call for help.\n2. Report the accident to the Coast Guard or local authorities.\n3. Exchange information with other boat operators.\n4. Document the water conditions and weather.",
        howWeHelp: "We understand maritime laws and state boating regulations. Whether it was a collision, BUI (Boating Under the Influence), or equipment failure, we hold the responsible parties accountable."
      },
      'bus': {
        title: 'Bus Accidents',
        desc: 'Public transit and private charter collisions.',
        whatToDo: "1. Seek immediate medical attention.\n2. Keep your bus ticket or proof of ridership.\n3. Get contact info from other passengers.\n4. File a report with the bus company or transit authority immediately.",
        howWeHelp: "Bus cases often involve government entities with strict filing deadlines (sovereign immunity). We ensure your claim is filed on time and investigate driver training and vehicle maintenance records."
      },
      'rideshare': {
        title: 'Uber and Lyft Rideshare',
        desc: 'Holding rideshare giants accountable.',
        whatToDo: "1. Call 911.\n2. Take a screenshot of your ride status in the app.\n3. Get the driver's info and insurance.\n4. Report the accident through the app, but do not give a detailed statement yet.",
        howWeHelp: "Rideshare cases involve complex insurance policies (periods 1, 2, and 3). We determine which policy applies and fight to ensure Uber or Lyft's million-dollar policies cover your injuries."
      },
      'pedestrian': {
        title: 'Pedestrian Accidents',
        desc: 'Fighting for those injured while walking.',
        whatToDo: "1. Do not leave the scene.\n2. Call 911.\n3. Get driver and witness information.\n4. Take photos of the crosswalk, signals, and lighting.\n5. Seek medical care immediately.",
        howWeHelp: "Pedestrians have no protection and often suffer catastrophic injuries. We reconstruct the accident to prove the driver failed to yield and fight for the long-term care compensation you need."
      },
      'passenger': {
        title: 'Passenger Injuries',
        desc: 'Representation for passengers.',
        whatToDo: "1. Ensure a police report is filed.\n2. Get insurance info from all drivers involved.\n3. Seek medical treatment.\n4. Call an attorney - you have rights even if your friend was driving.",
        howWeHelp: "As a passenger, you are rarely at fault. We can file claims against the other driver's insurance and, if necessary, the host driver's insurance to ensure your medical bills are covered."
      },
      'slip-fall': {
        title: 'Slip and Fall',
        desc: 'Premises liability cases.',
        whatToDo: "1. Report the incident to the property manager immediately.\n2. Ask for a copy of the incident report.\n3. Take photos of the hazard (spill, uneven floor) before it's cleaned.\n4. Get witness names.",
        howWeHelp: "We prove that the property owner knew or should have known about the dangerous condition. We obtain surveillance footage and maintenance records to build a strong premises liability case."
      },
      'construction': {
        title: 'Construction Zone Accidents',
        desc: 'Injuries on active construction sites.',
        whatToDo: "1. Report the injury to your supervisor immediately.\n2. Seek medical help.\n3. Identify witnesses.\n4. Do not sign settlement offers from workers' comp without legal advice.",
        howWeHelp: "Beyond workers' comp, you may have a third-party claim against subcontractors, equipment manufacturers, or property owners. We explore all avenues for compensation."
      },
      'brain': {
        title: 'Brain Injuries',
        desc: 'Catastrophic TBI cases.',
        whatToDo: "1. Seek immediate medical attention for any head trauma.\n2. Monitor for symptoms like dizziness, memory loss, or mood changes.\n3. Keep a journal of your symptoms.\n4. Consult with a neurologist.",
        howWeHelp: "TBIs can have life-altering consequences. We work with medical experts to calculate the lifetime cost of care, lost earning capacity, and diminished quality of life to secure a settlement that secures your future."
      },
      'mesh': {
        title: 'Surgical Mesh',
        desc: 'Defective hernia and vaginal mesh implants.',
        whatToDo: "1. Consult your doctor if you experience pain or complications.\n2. Request your medical records identifying the specific mesh product used.\n3. Contact an attorney to check if your device is subject to a recall.",
        howWeHelp: "We handle mass tort litigation against manufacturers of defective medical devices. We fight for compensation for revision surgeries, pain, and suffering caused by failed mesh implants."
      },
      'hair': {
        title: 'Hair Relaxer Lawsuit',
        desc: 'Chemical hair straighteners linked to cancer.',
        whatToDo: "1. Save receipts or proof of purchase of hair relaxer products.\n2. Document your history of use (brands, frequency, salons).\n3. Obtain medical records if diagnosed with uterine or ovarian cancer.",
        howWeHelp: "We are investigating claims that chemical hair straighteners caused cancer. We aim to hold manufacturers accountable for failing to warn consumers about the risks of their products."
      },
      'roundup': {
        title: 'Roundup',
        desc: 'Weed killer linked to Non-Hodgkin Lymphoma.',
        whatToDo: "1. Document your exposure to Roundup (dates, frequency, location).\n2. Keep receipts of purchase.\n3. Get copies of medical records diagnosing Non-Hodgkin Lymphoma.",
        howWeHelp: "We represent individuals diagnosed with cancer after using Roundup. We fight against Monsanto/Bayer to secure compensation for medical costs and suffering due to exposure to glyphosate."
      },
      'talc': {
        title: 'J&J Talcum Powder',
        desc: 'Cases involving ovarian cancer.',
        whatToDo: "1. Document your history of using talcum powder products.\n2. Obtain medical records regarding your ovarian cancer diagnosis.\n3. Contact us for a free case evaluation.",
        howWeHelp: "We are pursuing claims that asbestos-contaminated talc caused ovarian cancer. We fight to hold Johnson & Johnson accountable for putting profit over consumer safety."
      },
      'ozempic': {
        title: 'Ozempic',
        desc: 'Gastroparesis and severe stomach paralysis.',
        whatToDo: "1. Seek medical attention for severe vomiting or stomach pain.\n2. Discuss your symptoms with your doctor.\n3. Keep records of your prescription and usage.",
        howWeHelp: "We are investigating claims of severe gastrointestinal injuries linked to Ozempic and Wegovy. If you suffered gastroparesis, we can help you seek compensation for your injuries."
      },
      'truvada': {
        title: 'Truvada',
        desc: 'Kidney disease and bone density loss.',
        whatToDo: "1. Monitor your kidney function and bone density with your doctor.\n2. Keep records of your TDF drug prescriptions.\n3. Contact an attorney if you have been diagnosed with kidney failure or osteoporosis.",
        howWeHelp: "We represent patients harmed by TDF drugs like Truvada. We argue that the manufacturer delayed releasing a safer alternative (TAF) to maximize profits, causing unnecessary harm to patients."
      }
    }
  },
  es: {
    nav: { home: "Inicio", practiceAreas: "Áreas de Práctica", results: "Resultados", contact: "Contáctenos", freeConsult: "Consulta Gratis" },
    hero: { subSlogan: "Representación implacable para víctimas.", stat1: "$1 Billón+", stat1Label: "Recuperado", slogans: [{ l1: "Billones Ganados.", l2: "Ganamos." }, { l1: "Sin Honorarios.", l2: "Hasta Que Ganemos." }, { l1: "Llámenos Antes del 911.", l2: "Podemos Ganar." }, { l1: "Justicia Para Su Lesión.", l2: "Paz Para Su Mente." }] },
    form: { title: "Evaluación Gratuita", subtitle: "Nuestra oficina se comunicará con usted dentro de las 24 horas.", nameLabel: "Nombre Completo", phoneLabel: "Número de Teléfono", emailLabel: "Correo Electrónico", stateLabel: "Estado", dateLabel: "Fecha del Accidente", timeLabel: "Hora del Accidente", accidentLabel: "Describa el Accidente", injuryLabel: "Tipo de Lesión", submitBtn: "Enviar", disclaimer: "*Al presionar 'Enviar' usted acepta recibir llamadas y notificaciones SMS.", sending: "Enviando...", success: "¡Solicitud Enviada!", error: "Error. Intente de nuevo." },
    sections: { areasTitle: "Nuestras Áreas de Práctica", areasSubtitle: "Seleccione una categoría para ver tipos de casos específicos", viewAll: "Ver Todos los Casos", learnMore: "Aprende Más", whyUs: "¿Por qué elegir Car Accident Attorneys?", callToAction: "No Espere. Justicia Retrasada es Justicia Denegada." },
    footer: { copyright: "© 2025 Car Accident Attorneys. Todos los derechos reservados.", mainOffice: "Oficina Principal", newClients: "Nuevos Clientes" },
    testimonials: {
      title: "Historias de Éxito",
      subtitle: "Vea lo que dicen nuestros clientes.",
      googleRating: "5.0 Estrellas en Google",
      reviews: [
        { name: "Elizabeth Gonzalez", text: "Tuve un accidente en abril donde se consideró culpa de la otra parte y me recomendaron las Oficinas Legales de Parke Injury. Mi caso concluyó el 18 de noviembre y recibí mi acuerdo. Fue casi el doble de lo anticipado..." },
        { name: "Annie Smith", text: "Tuve una gran experiencia con el bufete de abogados Parke Injury después de mi accidente automovilístico. De principio a fin, hicieron que una situación estresante fuera mucho más fácil de manejar. ¡JB y Chase fueron increíblemente serviciales! Siempre profesionales..." },
        { name: "Veronica Salazar", text: "Tuvimos una gran experiencia trabajando con esta oficina de abogados de accidentes. Chase, Margarth y todo el equipo fueron increíblemente serviciales con el caso de mi esposo. Trabajaron duro para asegurar que obtuviéramos el mejor resultado posible..." },
        { name: "Sang Hwi Lee", text: "Estoy más que agradecido por el servicio excepcional que recibí del bufete de abogados Parke Injury durante mi caso de lesiones personales. Desde la primera consulta hasta la resolución final, el equipo demostró profesionalismo..." },
        { name: "Ahmed Galal", text: "El bufete de abogados Parke son los abogados más profesionales en accidentes de tráfico, ya que tuve un accidente con fuga en mayo de 2020, todo lo que tenía era una foto de las placas de ese tipo y pudieron encontrarlo con LVMPD..." }
      ]
    },
    detailPage: {
      introPart1: "Nos especializamos en",
      introPart2: "casos.",
      whyTitle: "Por Qué Necesita Representación",
      whyText: "Las compañías de seguros...",
      commitTitle: "Nuestro Compromiso:",
      commitments: ["Cero Costos Iniciales"],
      aboutTitle: "Sobre Este Reclamo",
      aboutText: "Investigamos cada detalle...",
      whatToDoTitle: "Qué Hacer Después de un Accidente",
      howWeHelpTitle: "Cómo Podemos Ayudar"
    },
    categories: { 'cat-vehicle': { title: 'Accidentes de Vehículos', desc: 'Autos, camiones, etc.' }, 'cat-products': { title: 'Productos Peligrosos', desc: 'Productos defectuosos.' }, 'cat-injury': { title: 'Lesiones Personales', desc: 'Resbalones y caídas.' } },
    areas: {
      'car-accidents': {
        title: 'Accidentes de Auto',
        desc: 'Representación experta.',
        whatToDo: "1. Llame al 911 inmediatamente.\n2. Busque atención médica, incluso si se siente bien.\n3. Reúna pruebas: fotos de la escena, información de testigos.\n4. Intercambie información de seguro.\n5. NO dé una declaración grabada a la aseguradora del otro conductor.\n6. Llame a Car Accident Attorneys.",
        howWeHelp: "Manejamos toda la comunicación con las aseguradoras. Investigamos el accidente, probamos la responsabilidad y luchamos por la máxima compensación para sus facturas médicas y salarios perdidos."
      },
      'motorcycle': {
        title: 'Accidentes de Motocicleta',
        desc: 'Protección para motociclistas.',
        whatToDo: "1. Muévase a un lugar seguro.\n2. Llame a la policía y paramédicos.\n3. Conserve su casco y equipo como evidencia.\n4. Tome fotos de las condiciones de la carretera.\n5. Contacte a un abogado antes de hablar con el seguro.",
        howWeHelp: "Los motociclistas a menudo enfrentan prejuicios. Luchamos para probar que el otro conductor tuvo la culpa y entendemos las lesiones graves que pueden resultar."
      },
      'commercial': {
        title: 'Accidentes de Camiones',
        desc: 'Litigios complejos.',
        whatToDo: "1. Llame al 911.\n2. Obtenga el número CDL del conductor, nombre de la empresa y seguro.\n3. Tome fotos del número DOT del camión.\n4. No firme nada de la empresa de camiones.",
        howWeHelp: "Los casos de camiones involucran regulaciones federales. Enviamos cartas de expoliación para preservar los datos de la caja negra y los registros del conductor para probar negligencia."
      },
      'boating': {
        title: 'Accidentes de Navegación',
        desc: 'Lesiones en lagos.',
        whatToDo: "1. Verifique si hay heridos y pida ayuda.\n2. Reporte el accidente a la Guardia Costera.\n3. Intercambie información con otros operadores.\n4. Documente las condiciones del agua.",
        howWeHelp: "Entendemos las leyes marítimas. Ya sea una colisión, BUI (Navegación bajo la influencia) o falla del equipo, hacemos responsables a las partes culpables."
      },
      'bus': {
        title: 'Accidentes de Autobús',
        desc: 'Colisiones de transporte público.',
        whatToDo: "1. Busque atención médica inmediata.\n2. Guarde su boleto de autobús.\n3. Obtenga información de contacto de otros pasajeros.\n4. Presente un informe a la compañía de autobuses inmediatamente.",
        howWeHelp: "Los casos de autobuses a menudo involucran entidades gubernamentales con plazos estrictos. Aseguramos que su reclamo se presente a tiempo e investigamos los registros de mantenimiento."
      },
      'rideshare': {
        title: 'Uber y Lyft',
        desc: 'Responsabilidad de transporte.',
        whatToDo: "1. Llame al 911.\n2. Tome una captura de pantalla de su estado de viaje en la aplicación.\n3. Obtenga la información del conductor.\n4. Reporte el accidente a través de la aplicación.",
        howWeHelp: "Los casos de viajes compartidos involucran pólizas de seguro complejas. Determinamos qué póliza se aplica y luchamos para asegurar que Uber o Lyft cubran sus lesiones."
      },
      'pedestrian': {
        title: 'Accidentes de Peatones',
        desc: 'Luchando por los heridos.',
        whatToDo: "1. No abandone la escena.\n2. Llame al 911.\n3. Obtenga información del conductor y testigos.\n4. Tome fotos del paso de peatones y la iluminación.\n5. Busque atención médica inmediatamente.",
        howWeHelp: "Los peatones no tienen protección y a menudo sufren lesiones catastróficas. Reconstruimos el accidente para probar que el conductor no cedió el paso."
      },
      'passenger': {
        title: 'Lesiones de Pasajeros',
        desc: 'Representación para pasajeros.',
        whatToDo: "1. Asegúrese de que se presente un informe policial.\n2. Obtenga información de seguro de todos los conductores.\n3. Busque tratamiento médico.\n4. Llame a un abogado: tiene derechos.",
        howWeHelp: "Como pasajero, rara vez tiene la culpa. Podemos presentar reclamos contra el seguro del otro conductor y, si es necesario, el seguro del conductor anfitrión."
      },
      'slip-fall': {
        title: 'Resbalones y Caídas',
        desc: 'Responsabilidad de locales.',
        whatToDo: "1. Reporte el incidente al gerente inmediatamente.\n2. Pida una copia del informe del incidente.\n3. Tome fotos del peligro antes de que se limpie.\n4. Obtenga nombres de testigos.",
        howWeHelp: "Probamos que el propietario sabía sobre la condición peligrosa. Obtenemos imágenes de vigilancia para construir un caso sólido de responsabilidad de locales."
      },
      'construction': {
        title: 'Accidentes de Construcción',
        desc: 'Lesiones en construcción.',
        whatToDo: "1. Reporte la lesión a su supervisor inmediatamente.\n2. Busque ayuda médica.\n3. Identifique testigos.\n4. No firme ofertas de compensación laboral sin asesoramiento legal.",
        howWeHelp: "Más allá de la compensación laboral, puede tener un reclamo de terceros contra subcontratistas o fabricantes de equipos. Exploramos todas las vías de compensación."
      },
      'brain': {
        title: 'Lesiones Cerebrales',
        desc: 'Casos de TBI.',
        whatToDo: "1. Busque atención médica inmediata para cualquier trauma en la cabeza.\n2. Monitoree síntomas como mareos o pérdida de memoria.\n3. Mantenga un diario de sus síntomas.\n4. Consulte con un neurólogo.",
        howWeHelp: "Las TBI pueden tener consecuencias de por vida. Trabajamos con expertos médicos para calcular el costo de por vida de la atención y la capacidad de ganancia perdida."
      },
      'mesh': {
        title: 'Malla Quirúrgica',
        desc: 'Implantes defectuosos.',
        whatToDo: "1. Consulte a su médico si experimenta dolor.\n2. Solicite sus registros médicos identificando el producto de malla.\n3. Contacte a un abogado para verificar si su dispositivo está sujeto a un retiro del mercado.",
        howWeHelp: "Manejamos litigios masivos contra fabricantes de dispositivos médicos defectuosos. Luchamos por la compensación por cirugías de revisión y sufrimiento."
      },
      'hair': {
        title: 'Alisadores de Cabello',
        desc: 'Productos químicos.',
        whatToDo: "1. Guarde recibos de productos alisadores.\n2. Documente su historial de uso.\n3. Obtenga registros médicos si se le diagnostica cáncer de útero u ovario.",
        howWeHelp: "Estamos investigando reclamos de que los alisadores químicos causaron cáncer. Buscamos responsabilizar a los fabricantes por no advertir sobre los riesgos."
      },
      'roundup': {
        title: 'Roundup (Glifosato)',
        desc: 'Litigios de herbicidas.',
        whatToDo: "1. Documente su exposición a Roundup.\n2. Guarde recibos de compra.\n3. Obtenga copias de registros médicos que diagnostiquen Linfoma no Hodgkin.",
        howWeHelp: "Representamos a personas diagnosticadas con cáncer después de usar Roundup. Luchamos contra Monsanto/Bayer para asegurar la compensación."
      },
      'talc': {
        title: 'Talco de J&J',
        desc: 'Casos de cáncer.',
        whatToDo: "1. Documente su historial de uso de productos de talco.\n2. Obtenga registros médicos sobre su diagnóstico de cáncer de ovario.\n3. Contáctenos para una evaluación gratuita.",
        howWeHelp: "Estamos persiguiendo reclamos de que el talco contaminado con asbesto causó cáncer de ovario. Luchamos para responsabilizar a Johnson & Johnson."
      },
      'ozempic': {
        title: 'Ozempic',
        desc: 'Problemas estomacales.',
        whatToDo: "1. Busque atención médica para vómitos severos.\n2. Discuta sus síntomas con su médico.\n3. Mantenga registros de su prescripción.",
        howWeHelp: "Estamos investigando reclamos de lesiones gastrointestinales severas vinculadas a Ozempic. Si sufrió gastroparesia, podemos ayudarlo a buscar compensación."
      },
      'truvada': {
        title: 'Truvada',
        desc: 'Enfermedad renal.',
        whatToDo: "1. Monitoree su función renal y densidad ósea.\n2. Mantenga registros de sus recetas de medicamentos TDF.\n3. Contacte a un abogado si ha sido diagnosticado con insuficiencia renal.",
        howWeHelp: "Representamos a pacientes perjudicados por medicamentos TDF como Truvada. Argumentamos que el fabricante retrasó una alternativa más segura para maximizar las ganancias."
      }
    }
  },
  ko: {
    nav: { home: "홈", practiceAreas: "업무 분야", results: "승소 사례", contact: "문의하기", freeConsult: "무료 상담" },
    hero: { subSlogan: "피해자를 위한 끊임없는 대변.", stat1: "$10억+", stat1Label: "보상금 회수", slogans: [{ l1: "수십억 달러 승소.", l2: "우리는 이깁니다." }, { l1: "수임료 0원.", l2: "승소할 때까지." }, { l1: "911보다 먼저 전화하세요.", l2: "우리가 승리합니다." }, { l1: "부상에 대한 정의.", l2: "마음의 평화." }] },
    form: { title: "무료 사건 검토", subtitle: "무료 견적을 받아보세요.", namePlaceholder: "성함", phonePlaceholder: "전화번호", emailPlaceholder: "이메일 주소", detailsPlaceholder: "사건 경위를 말씀해 주세요...", submitBtn: "무료 견적 및 상담 지금 연락하세요", sending: "전송 중...", success: "요청이 전송되었습니다!", error: "오류가 발생했습니다. 다시 시도해 주세요.", stateLabel: "사고 발생 주", dateLabel: "사고 날짜", timeLabel: "사고 시간", accidentLabel: "사고 경위", injuryLabel: "부상 유형" },
    sections: { areasTitle: "전문 분야", areasSubtitle: "특정 사건 유형을 보려면 카테고리를 선택하세요", viewAll: "모든 사례 보기", learnMore: "더 알아보기", whyUs: "왜 Car Accident Attorneys를 선택해야 할까요?", callToAction: "기다리지 마십시오. 지체된 정의는 정의가 아닙니다." },
    footer: { copyright: "© 2025 Car Accident Attorneys. All Rights Reserved.", mainOffice: "본사", newClients: "신규 고객" },
    testimonials: {
      title: "고객 성공 사례",
      subtitle: "Google에서 고객들이 우리에 대해 어떻게 말하는지 확인하세요.",
      googleRating: "Google 평점 5.0",
      reviews: [
        { name: "Elizabeth Gonzalez", text: "4월에 상대방 과실로 인정된 사고를 당해 Parke Injury Law Offices를 추천받았습니다. 제 사건은 11월 18일에 종결되었고 합의금을 받았습니다. 예상했던 것보다 거의 두 배나 많았습니다..." },
        { name: "Annie Smith", text: "차 사고 후 Parke Injury Law Firm에서 훌륭한 경험을 했습니다. 처음부터 끝까지 스트레스 받는 상황을 훨씬 더 쉽게 처리할 수 있게 해주었습니다. JB와 Chase는 정말 큰 도움이 되었습니다! 항상 전문적이었습니다..." },
        { name: "Veronica Salazar", text: "이 사고 변호사 사무실과 함께 일하면서 훌륭한 경험을 했습니다. Chase, Margarth, 그리고 전체 팀은 제 남편의 사건에 대해 정말 큰 도움이 되었습니다. 그들은 우리가 최상의 결과를 얻을 수 있도록 열심히 노력했습니다..." },
        { name: "Sang Hwi Lee", text: "제 개인 상해 사건 동안 Parke Injury Law Firm에서 받은 탁월한 서비스에 대해 정말 감사합니다. 첫 상담부터 최종 해결까지 팀은 전문성을 보여주었습니다..." },
        { name: "Ahmed Galal", text: "Parke 법률 사무소는 교통 사고 분야에서 가장 전문적인 변호사들입니다. 2020년 5월에 뺑소니 사고를 당했을 때 제가 가진 것은 그 사람의 번호판 사진뿐이었는데 LVMPD와 함께 그를 찾을 수 있었습니다..." }
      ]
    },
    detailPage: {
      introPart1: "Car Accident Attorneys는",
      introPart2: "사건을 전문으로 합니다.",
      whyTitle: "대리인이 필요한 이유",
      whyText: "보험 회사와 대기업에는...",
      commitTitle: "고객에 대한 약속:",
      commitments: ["초기 비용 0원"],
      aboutTitle: "이 청구에 대하여",
      aboutText: "우리는 귀하의 사건에 대한 모든 세부 사항을 조사합니다.",
      whatToDoTitle: "사고 후 대처 방법",
      howWeHelpTitle: "우리가 도울 수 있는 방법"
    },
    categories: { 'cat-vehicle': { title: '자동차 사고', desc: '자동차, 트럭 등' }, 'cat-products': { title: '위험한 제품', desc: '결함이 있는 약물' }, 'cat-injury': { title: '개인 상해', desc: '미끄러짐, 낙상' } },
    areas: {
      'car-accidents': {
        title: '자동차 사고',
        desc: '전문적인 법률 대리.',
        whatToDo: "1. 즉시 911에 전화하십시오.\n2. 괜찮다고 느껴지더라도 의사의 진찰을 받으십시오.\n3. 증거 수집: 현장 사진, 목격자 연락처.\n4. 보험 정보를 교환하십시오.\n5. 상대방 운전자의 보험사에 녹음된 진술을 하지 마십시오.\n6. Car Accident Attorneys에 전화하십시오.",
        howWeHelp: "우리는 보험 회사와의 모든 커뮤니케이션을 처리하여 귀하의 청구에 해가 될 수 있는 말을 하지 않도록 보장합니다. 우리는 사고를 조사하고 책임을 입증하며 의료비, 임금 손실 및 고통에 대한 최대 보상을 위해 싸웁니다."
      },
      'motorcycle': {
        title: '오토바이 사고',
        desc: '라이더 보호.',
        whatToDo: "1. 가능한 경우 안전한 곳으로 이동하십시오.\n2. 경찰과 구급대원에게 전화하십시오.\n3. 헬멧과 장비를 증거로 보관하십시오.\n4. 도로 상태와 차량 손상 사진을 찍으십시오.\n5. 보험사와 이야기하기 전에 변호사에게 연락하십시오.",
        howWeHelp: "오토바이 운전자는 종종 보험 회사로부터 편견을 받습니다. 우리는 상대방 운전자의 과실임을 입증하기 위해 싸웁니다. 우리는 오토바이 사고의 독특한 역학 관계와 발생할 수 있는 심각한 부상을 이해합니다."
      },
      'commercial': {
        title: '트럭 사고',
        desc: '복잡한 소송.',
        whatToDo: "1. 911에 전화하십시오.\n2. 트럭 운전자의 CDL 번호, 회사 이름 및 보험을 확보하십시오.\n3. 트럭의 DOT 번호 사진을 찍으십시오.\n4. 트럭 회사의 어떤 서류에도 서명하지 마십시오.",
        howWeHelp: "트럭 운송 사건에는 연방 규정과 여러 책임 당사자(운전자, 회사, 적재업체)가 관련됩니다. 우리는 과실을 입증하기 위해 블랙박스 데이터와 운전자 로그를 보존하라는 증거 보전 서신을 보냅니다."
      },
      'boating': {
        title: '보트 사고',
        desc: '부상.',
        whatToDo: "1. 부상 여부를 확인하고 도움을 요청하십시오.\n2. 해안 경비대나 지역 당국에 사고를 신고하십시오.\n3. 다른 보트 운영자와 정보를 교환하십시오.\n4. 수질 상태와 날씨를 기록하십시오.",
        howWeHelp: "우리는 해사법과 주 보트 규정을 이해합니다. 충돌, BUI(음주 운항) 또는 장비 고장이든 관계없이 책임 있는 당사자에게 책임을 묻습니다."
      },
      'bus': {
        title: '버스 사고',
        desc: '대중 교통.',
        whatToDo: "1. 즉시 치료를 받으십시오.\n2. 버스 티켓이나 승차 증명서를 보관하십시오.\n3. 다른 승객의 연락처 정보를 얻으십시오.\n4. 즉시 버스 회사나 교통 당국에 신고서를 제출하십시오.",
        howWeHelp: "버스 사건은 종종 엄격한 제출 기한(주권 면제)이 있는 정부 기관과 관련됩니다. 우리는 귀하의 청구가 제때 제출되도록 보장하고 운전자 교육 및 차량 유지 관리 기록을 조사합니다."
      },
      'rideshare': {
        title: '우버(Uber) 및 리프트(Lyft)',
        desc: '승객 안전.',
        whatToDo: "1. 911에 전화하십시오.\n2. 앱에서 승차 상태의 스크린샷을 찍으십시오.\n3. 운전자의 정보와 보험을 확보하십시오.\n4. 앱을 통해 사고를 신고하되, 아직 자세한 진술은 하지 마십시오.",
        howWeHelp: "차량 공유 사건에는 복잡한 보험 정책이 관련됩니다. 우리는 어떤 정책이 적용되는지 결정하고 Uber나 Lyft의 백만 달러 정책이 귀하의 부상을 보장하도록 싸웁니다."
      },
      'pedestrian': {
        title: '보행자 사고',
        desc: '보행자 보호.',
        whatToDo: "1. 현장을 떠나지 마십시오.\n2. 911에 전화하십시오.\n3. 운전자와 목격자 정보를 얻으십시오.\n4. 횡단보도, 신호 및 조명 사진을 찍으십시오.\n5. 즉시 치료를 받으십시오.",
        howWeHelp: "보행자는 보호 장비가 없으며 종종 치명적인 부상을 입습니다. 우리는 사고를 재구성하여 운전자가 양보하지 않았음을 입증하고 귀하에게 필요한 장기 치료 보상을 위해 싸웁니다."
      },
      'passenger': {
        title: '승객 부상',
        desc: '승객 대리.',
        whatToDo: "1. 경찰 보고서가 제출되었는지 확인하십시오.\n2. 관련된 모든 운전자의 보험 정보를 얻으십시오.\n3. 치료를 받으십시오.\n4. 변호사에게 전화하십시오 - 친구가 운전했더라도 귀하에게는 권리가 있습니다.",
        howWeHelp: "승객으로서 귀하는 거의 과실이 없습니다. 우리는 귀하의 의료비가 보장되도록 상대방 운전자의 보험과 필요한 경우 운전자의 보험에 청구할 수 있습니다."
      },
      'slip-fall': {
        title: '미끄러짐 및 낙상',
        desc: '구내 책임.',
        whatToDo: "1. 즉시 관리자에게 사건을 보고하십시오.\n2. 사건 보고서 사본을 요청하십시오.\n3. 청소되기 전에 위험 요소(유출물, 고르지 않은 바닥)의 사진을 찍으십시오.\n4. 목격자 이름을 확보하십시오.",
        howWeHelp: "우리는 부동산 소유자가 위험한 상태에 대해 알고 있었거나 알았어야 했음을 입증합니다. 우리는 강력한 구내 책임 사건을 구축하기 위해 감시 영상과 유지 관리 기록을 확보합니다."
      },
      'construction': {
        title: '건설 현장 사고',
        desc: '건설 부상.',
        whatToDo: "1. 즉시 감독관에게 부상을 보고하십시오.\n2. 의학적 도움을 구하십시오.\n3. 목격자를 확인하십시오.\n4. 법적 조언 없이 산재 보상 제안에 서명하지 마십시오.",
        howWeHelp: "산재 보상 외에도 하청업체, 장비 제조업체 또는 부동산 소유자에 대한 제3자 청구가 있을 수 있습니다. 우리는 보상을 위한 모든 방법을 모색합니다."
      },
      'brain': {
        title: '뇌 손상 (TBI)',
        desc: '치명적인 TBI.',
        whatToDo: "1. 머리 외상에 대해 즉시 치료를 받으십시오.\n2. 현기증, 기억 상실 또는 기분 변화와 같은 증상을 모니터링하십시오.\n3. 증상 일지를 작성하십시오.\n4. 신경과 전문의와 상담하십시오.",
        howWeHelp: "TBI는 평생에 걸친 결과를 초래할 수 있습니다. 우리는 의료 전문가와 협력하여 평생 치료 비용, 상실된 소득 능력 및 삶의 질 저하를 계산하여 귀하의 미래를 보장하는 합의를 확보합니다."
      },
      'mesh': {
        title: '수술용 메쉬',
        desc: '결함 있는 임플란트.',
        whatToDo: "1. 통증이나 합병증이 발생하면 의사와 상담하십시오.\n2. 사용된 특정 메쉬 제품을 식별하는 의료 기록을 요청하십시오.\n3. 귀하의 기기가 리콜 대상인지 확인하려면 변호사에게 문의하십시오.",
        howWeHelp: "우리는 결함이 있는 의료 기기 제조업체를 상대로 한 대규모 불법 행위 소송을 처리합니다. 우리는 실패한 메쉬 임플란트로 인한 재수술, 고통 및 괴로움에 대한 보상을 위해 싸웁니다."
      },
      'hair': {
        title: '헤어 릴랙서 소송',
        desc: '화학 물질.',
        whatToDo: "1. 헤어 릴랙서 제품 구매 영수증이나 증거를 보관하십시오.\n2. 사용 이력(브랜드, 빈도, 미용실)을 기록하십시오.\n3. 자궁암이나 난소암 진단을 받은 경우 의료 기록을 확보하십시오.",
        howWeHelp: "우리는 화학 헤어 스트레이트너가 암을 유발했다는 주장을 조사하고 있습니다. 우리는 제품의 위험성에 대해 소비자에게 경고하지 않은 제조업체에 책임을 묻는 것을 목표로 합니다."
      },
      'roundup': {
        title: '라운드업 (Roundup)',
        desc: '제초제 소송.',
        whatToDo: "1. 라운드업 노출(날짜, 빈도, 장소)을 기록하십시오.\n2. 구매 영수증을 보관하십시오.\n3. 비호지킨 림프종 진단 의료 기록 사본을 받으십시오.",
        howWeHelp: "우리는 라운드업 사용 후 암 진단을 받은 개인을 대리합니다. 우리는 글리포세이트 노출로 인한 의료비와 고통에 대한 보상을 확보하기 위해 몬산토/바이엘과 싸웁니다."
      },
      'talc': {
        title: 'J&J 베이비 파우더',
        desc: '활석 제품.',
        whatToDo: "1. 활석 분말 제품 사용 이력을 기록하십시오.\n2. 난소암 진단에 관한 의료 기록을 확보하십시오.\n3. 무료 사건 평가를 위해 저희에게 연락하십시오.",
        howWeHelp: "우리는 석면이 오염된 활석이 난소암을 유발했다는 주장을 추구하고 있습니다. 우리는 소비자 안전보다 이익을 우선시한 존슨앤존슨에 책임을 묻기 위해 싸웁니다."
      },
      'ozempic': {
        title: '오젬픽 (Ozempic)',
        desc: '위마비.',
        whatToDo: "1. 심한 구토나 복통이 있으면 치료를 받으십시오.\n2. 의사와 증상에 대해 상의하십시오.\n3. 처방전 및 사용 기록을 보관하십시오.",
        howWeHelp: "우리는 오젬픽 및 위고비와 관련된 심각한 위장 손상 주장을 조사하고 있습니다. 위마비를 겪었다면 보상을 받을 수 있도록 도와드릴 수 있습니다."
      },
      'truvada': {
        title: '트루바다 (Truvada)',
        desc: '신장 질환.',
        whatToDo: "1. 의사와 함께 신장 기능과 골밀도를 모니터링하십시오.\n2. TDF 약물 처방 기록을 보관하십시오.\n3. 신부전이나 골다공증 진단을 받은 경우 변호사에게 연락하십시오.",
        howWeHelp: "우리는 트루바다와 같은 TDF 약물로 인해 피해를 입은 환자를 대리합니다. 우리는 제조업체가 이익을 극대화하기 위해 더 안전한 대안(TAF) 출시를 지연시켜 환자에게 불필요한 해를 끼쳤다고 주장합니다."
      }
    }
  },
  zh: {
    nav: { home: "首页", practiceAreas: "业务领域", results: "成功案例", contact: "联系我们", freeConsult: "免费咨询" },
    hero: { subSlogan: "为受害者提供不懈的法律代表。", stat1: "10亿美元+", stat1Label: "已追回赔偿", slogans: [{ l1: "赢得数十亿赔偿。", l2: "我们必胜。" }, { l1: "不胜诉。", l2: "不收费。" }, { l1: "拨打911之前先致电。", l2: "我们可以赢。" }, { l1: "为您的伤害伸张正义。", l2: "为您的心灵带来安宁。" }] },
    form: { title: "免费案件评估", subtitle: "获取免费估算。", namePlaceholder: "全名", phonePlaceholder: "电话号码", emailPlaceholder: "电子邮箱", detailsPlaceholder: "请告诉我们发生了什么...", submitBtn: "免费估算和咨询 立即联系", sending: "发送中...", success: "请求已发送！", error: "错误。请重试。", stateLabel: "事故发生的州", dateLabel: "事故日期", timeLabel: "事故时间", accidentLabel: "事故描述", injuryLabel: "受伤类型" },
    sections: { areasTitle: "我们的业务领域", areasSubtitle: "选择一个类别查看具体案件类型", viewAll: "查看所有案例", learnMore: "了解更多", whyUs: "为什么选择 Car Accident Attorneys？", callToAction: "不要等待。迟到的正义非正义。" },
    footer: { copyright: "© 2025 Car Accident Attorneys. 版权所有。", mainOffice: "总办公室", newClients: "新客户" },
    testimonials: {
      title: "客户成功案例",
      subtitle: "查看我们的客户在 Google 上的评价。",
      googleRating: "Google 评分 5.0 星",
      reviews: [
        { name: "Elizabeth Gonzalez", text: "我在四月份发生了一起事故，被认定是对方的过错，有人向我推荐了 Parke 伤害律师事务所。我的案件已于 11 月 18 日结束，我已经收到了和解金。这几乎是预期的两倍……" },
        { name: "Annie Smith", text: "车祸发生后，我在 Parke 伤害律师事务所的经历非常棒。从开始到结束，他们让紧张的情况变得更容易处理。JB 和 Chase 提供了令人难以置信的帮助！总是很专业……" },
        { name: "Veronica Salazar", text: "我们与这家事故律师事务所的合作经历非常棒。Chase、Margarth 和整个团队对我丈夫的案件提供了令人难以置信的帮助。他们努力工作以确保我们获得尽可能最好的结果……" },
        { name: "Sang Hwi Lee", text: "我非常感谢我在人身伤害案件期间从 Parke 伤害律师事务所获得的卓越服务。从第一次咨询到最终解决，团队都表现出了专业精神……" },
        { name: "Ahmed Galal", text: "Parke 律师事务所是交通事故中最专业的律师，我在 2020 年 5 月遭遇了一起肇事逃逸事故，我只有那个人车牌的照片，他们能够通过 LVMPD 找到他……" }
      ]
    },
    detailPage: {
      introPart1: "在 Car Accident Attorneys，我们专门处理",
      introPart2: "案件。",
      whyTitle: "为什么您需要代理",
      whyText: "保险公司和大公司...",
      commitTitle: "我们要向您承诺：",
      commitments: ["零预付费用"],
      aboutTitle: "关于此索赔",
      aboutText: "我们调查您案件的每一个细节。",
      whatToDoTitle: "事故发生后该怎么办",
      howWeHelpTitle: "我们将如何提供帮助"
    },
    categories: { 'cat-vehicle': { title: '机动车事故', desc: '汽车、卡车等' }, 'cat-products': { title: '危险产品', desc: '有缺陷的药物' }, 'cat-injury': { title: '人身伤害', desc: '滑倒、跌倒' } },
    areas: {
      'car-accidents': {
        title: '汽车事故',
        desc: '专家法律代表。',
        whatToDo: "1. 立即拨打 911。\n2. 即使您感觉良好，也要寻求医疗救助。\n3. 收集证据：现场照片、目击者联系方式。\n4. 交换保险信息。\n5. 不要向对方司机的保险公司提供录音陈述。\n6. 致电 Car Accident Attorneys。",
        howWeHelp: "我们处理与保险公司的所有沟通，确保您不会说任何可能损害您索赔的话。我们调查事故，证明责任，并为您争取医疗费、误工费和痛苦赔偿的最大赔偿。"
      },
      'motorcycle': {
        title: '摩托车事故',
        desc: '保护骑手。',
        whatToDo: "1. 如果可能，移至安全地带。\n2. 呼叫警察和医护人员。\n3. 保留您的头盔和装备作为证据。\n4. 拍摄路况和车辆损坏的照片。\n5. 在与保险公司交谈之前联系律师。",
        howWeHelp: "摩托车手经常面临保险公司的偏见。我们努力证明是对方司机的过错。我们了解摩托车事故的独特动态以及可能造成的严重伤害。"
      },
      'commercial': {
        title: '卡车事故',
        desc: '复杂诉讼。',
        whatToDo: "1. 拨打 911。\n2. 获取卡车司机的 CDL 号码、公司名称和保险。\n3. 拍摄卡车 DOT 号码的照片。\n4. 不要签署卡车公司的任何文件。",
        howWeHelp: "卡车运输案件涉及联邦法规和多个责任方（司机、公司、装载机）。我们发送证据保全信以保存黑匣子数据和司机日志以证明疏忽。"
      },
      'boating': {
        title: '划船事故',
        desc: '伤害。',
        whatToDo: "1. 检查是否受伤并呼救。\n2. 向海岸警卫队或当地政府报告事故。\n3. 与其他船只操作员交换信息。\n4. 记录水况和天气。",
        howWeHelp: "我们了解海事法和州划船法规。无论是碰撞、BUI（酒后驾船）还是设备故障，我们都会追究责任方的责任。"
      },
      'bus': {
        title: '巴士事故',
        desc: '公共交通。',
        whatToDo: "1. 立即寻求医疗救助。\n2. 保留您的巴士车票或乘车证明。\n3. 获取其他乘客的联系方式。\n4. 立即向巴士公司或交通当局提交报告。",
        howWeHelp: "巴士案件通常涉及具有严格申请截止日期（主权豁免）的政府实体。我们确保您的索赔按时提交，并调查司机培训和车辆维护记录。"
      },
      'rideshare': {
        title: 'Uber 和 Lyft',
        desc: '乘客安全。',
        whatToDo: "1. 拨打 911。\n2. 在应用程序中截取您的行程状态截图。\n3. 获取司机的详细信息和保险。\n4. 通过应用程序报告事故，但暂时不要提供详细陈述。",
        howWeHelp: "拼车案件涉及复杂的保险单。我们确定适用哪种保单，并努力确保 Uber 或 Lyft 的百万美元保单涵盖您的伤害。"
      },
      'pedestrian': {
        title: '行人事故',
        desc: '行人保护。',
        whatToDo: "1. 不要离开现场。\n2. 拨打 911。\n3. 获取司机和目击者的信息。\n4. 拍摄人行横道、信号灯和照明的照片。\n5. 立即寻求医疗护理。",
        howWeHelp: "行人没有任何保护措施，经常遭受灾难性伤害。我们重建事故以证明司机没有让路，并为您争取所需的长期护理赔偿。"
      },
      'passenger': {
        title: '乘客受伤',
        desc: '乘客代表。',
        whatToDo: "1. 确保提交了警方报告。\n2. 获取所有涉事司机的保险信息。\n3. 寻求医疗治疗。\n4. 致电律师 - 即使是您的朋友开车，您也有权利。",
        howWeHelp: "作为乘客，您很少有过错。我们可以向对方司机的保险公司提出索赔，如有必要，也可以向房主司机的保险公司提出索赔，以确保您的医疗费用得到支付。"
      },
      'slip-fall': {
        title: '滑倒和跌倒',
        desc: '场所责任。',
        whatToDo: "1. 立即向经理报告事故。\n2. 索取事故报告副本。\n3. 在清理之前拍摄危险物（溢出物、不平坦的地板）的照片。\n4. 获取目击者姓名。",
        howWeHelp: "我们证明业主知道或应该知道危险情况。我们获取监控录像和维护记录，以建立强有力的场所责任案件。"
      },
      'construction': {
        title: '施工区事故',
        desc: '施工伤害。',
        whatToDo: "1. 立即向您的主管报告受伤情况。\n2. 寻求医疗帮助。\n3. 确认目击者。\n4. 在没有法律建议的情况下，不要签署工伤赔偿和解协议。",
        howWeHelp: "除了工伤赔偿外，您可能还可以向分包商、设备制造商或业主提出第三方索赔。我们探索所有赔偿途径。"
      },
      'brain': {
        title: '脑损伤 (TBI)',
        desc: '严重 TBI。',
        whatToDo: "1. 对任何头部外伤立即寻求医疗救助。\n2. 监测头晕、记忆力减退或情绪变化等症状。\n3. 记录您的症状日记。\n4. 咨询神经科医生。",
        howWeHelp: "TBI 可能会产生终身后果。我们与医学专家合作计算终身护理费用、收入能力丧失和生活质量下降，以确保达成保障您未来的和解。"
      },
      'mesh': {
        title: '手术网片',
        desc: '缺陷植入物。',
        whatToDo: "1. 如果您感到疼痛或并发症，请咨询您的医生。\n2. 索取您的医疗记录，确认使用的具体网片产品。\n3. 联系律师以检查您的设备是否被召回。",
        howWeHelp: "我们处理针对缺陷医疗设备制造商的大规模侵权诉讼。我们为您争取因网片植入失败而导致的修复手术、疼痛和痛苦的赔偿。"
      },
      'hair': {
        title: '直发剂诉讼',
        desc: '化学品。',
        whatToDo: "1. 保存直发产品的收据或购买凭证。\n2. 记录您的使用历史（品牌、频率、沙龙）。\n3. 如果被诊断患有子宫癌或卵巢癌，请获取医疗记录。",
        howWeHelp: "我们正在调查化学直发剂致癌的索赔。我们的目标是追究制造商未警告消费者产品风险的责任。"
      },
      'roundup': {
        title: '除草剂 (Roundup)',
        desc: '除草剂诉讼。',
        whatToDo: "1. 记录您接触 Roundup 的情况（日期、频率、地点）。\n2. 保留购买收据。\n3. 获取诊断非霍奇金淋巴瘤的医疗记录副本。",
        howWeHelp: "我们代表使用 Roundup 后被诊断患有癌症的个人。我们与孟山都/拜耳作斗争，以确保为您因接触草甘膦而产生的医疗费用和痛苦获得赔偿。"
      },
      'talc': {
        title: '强生滑石粉',
        desc: '滑石粉产品。',
        whatToDo: "1. 记录您使用滑石粉产品的历史。\n2. 获取有关您卵巢癌诊断的医疗记录。\n3. 联系我们进行免费案件评估。",
        howWeHelp: "我们正在追究石棉污染滑石粉导致卵巢癌的索赔。我们努力追究强生公司将利润置于消费者安全之上的责任。"
      },
      'ozempic': {
        title: 'Ozempic (减肥药)',
        desc: '胃轻瘫。',
        whatToDo: "1. 如果出现严重呕吐或胃痛，请寻求医疗救助。\n2. 与您的医生讨论您的症状。\n3. 保留您的处方和使用记录。",
        howWeHelp: "我们正在调查与 Ozempic 和 Wegovy 相关的严重胃肠道损伤索赔。如果您患有胃轻瘫，我们可以帮助您寻求赔偿。"
      },
      'truvada': {
        title: 'Truvada',
        desc: '肾脏疾病。',
        whatToDo: "1. 与您的医生一起监测您的肾功能和骨密度。\n2. 保留您的 TDF 药物处方记录。\n3. 如果您被诊断患有肾衰竭或骨质疏松症，请联系律师。",
        howWeHelp: "我们代表受 Truvada 等 TDF 药物伤害的患者。我们认为制造商为了利润最大化而推迟发布更安全的替代品 (TAF)，从而对患者造成了不必要的伤害。"
      }
    }
  }
};

// --- Components ---

const IntakeForm = ({ t }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    state: '',
    accidentDate: '',
    accidentTime: '',
    accidentDetails: '',
    injuryDetails: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const combinedAccidentDetails = `[Occurred: ${formData.accidentDate} at ${formData.accidentTime}] [State: ${formData.state}] ${formData.accidentDetails}`;

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          accidentDetails: combinedAccidentDetails,
          date: new Date().toLocaleString()
        })
      });

      await fetch("https://api.web3forms.com/submit", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...formData,
          accidentDetails: combinedAccidentDetails,
          subject: "New Lead from Website"
        })
      });

      setStatus('sent');
      setFormData({ firstName: '', phone: '', email: '', state: '', accidentDate: '', accidentTime: '', accidentDetails: '', injuryDetails: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-none shadow-2xl p-6 md:p-8 border-t-8 border-red-700 relative z-20">
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.form.title}</h3>
      <p className="text-gray-600 text-sm md:text-lg mb-6 font-medium">{t.form.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.nameLabel}</label>
          <input
            required
            type="text"
            placeholder={t.form.nameLabel}
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
            value={formData.firstName}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.phoneLabel}</label>
          <input
            required
            type="tel"
            placeholder={t.form.phoneLabel}
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.emailLabel}</label>
          <input
            required
            type="email"
            placeholder={t.form.emailLabel}
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.stateLabel}</label>
          <div className="relative">
            <select
              required
              className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition appearance-none"
              value={formData.state}
              onChange={e => setFormData({ ...formData, state: e.target.value })}
            >
              <option value="" disabled>Select State</option>
              {US_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <ChevronRight className="h-4 w-4 rotate-90" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-900 font-bold mb-1 text-sm flex items-center">
              <Calendar className="w-3 h-3 mr-1" /> {t.form.dateLabel}
            </label>
            <input
              required
              type="date"
              className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
              value={formData.accidentDate}
              onChange={e => setFormData({ ...formData, accidentDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-900 font-bold mb-1 text-sm flex items-center">
              <ClockIcon className="w-3 h-3 mr-1" /> {t.form.timeLabel}
            </label>
            <div className="relative">
              <select
                required
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition appearance-none"
                value={formData.accidentTime}
                onChange={e => setFormData({ ...formData, accidentTime: e.target.value })}
              >
                <option value="" disabled>Select Time</option>
                {Array.from({ length: 24 }).map((_, i) => {
                  const hour = i % 12 === 0 ? 12 : i % 12;
                  const ampm = i < 12 ? 'AM' : 'PM';
                  const nextHour = (i + 1) % 12 === 0 ? 12 : (i + 1) % 12;
                  const nextAmpm = (i + 1) < 12 || (i + 1) === 24 ? 'AM' : 'PM';
                  const label = `${hour}:00 ${ampm} - ${nextHour}:00 ${nextAmpm}`;
                  return <option key={i} value={label}>{label}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <ChevronRight className="h-4 w-4 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.accidentLabel}</label>
          <textarea
            required
            rows="2"
            placeholder="What Happened?"
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
            value={formData.accidentDetails}
            onChange={e => setFormData({ ...formData, accidentDetails: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.injuryLabel}</label>
          <textarea
            required
            rows="2"
            placeholder="Describe Your Injuries"
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
            value={formData.injuryDetails}
            onChange={e => setFormData({ ...formData, injuryDetails: e.target.value })}
          ></textarea>
        </div>

        <button
          disabled={status === 'sending' || status === 'sent'}
          type="submit"
          className={`w-full py-4 font-black text-white rounded shadow-lg uppercase tracking-widest text-sm transition duration-300 transform hover:-translate-y-1 ${status === 'sent' ? 'bg-green-700' : 'bg-red-700 hover:bg-red-800'}`}
        >
          {status === 'sending' ? t.form.sending : status === 'sent' ? t.form.success : status === 'error' ? t.form.error : t.form.submitBtn}
        </button>

        <p className="text-[10px] text-gray-400 leading-tight">
          {t.form.disclaimer}
        </p>
      </form>
    </div>
  );
};

const Header = ({ lang, setLang, setRoute, t, isScrolled, handleLangChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#1a1a1a] shadow-xl py-2' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* Logo - Fixed Single Line Layout */}
        <div
          onClick={() => setRoute('home')}
          className="flex items-center cursor-pointer group z-50 relative"
        >
          <div className="bg-red-700 p-2 mr-3 shadow-lg">
            <Scale className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center">
            <span className="font-serif text-lg md:text-2xl lg:text-3xl font-bold text-white tracking-wide uppercase">
              Car Accident<span className="text-red-600 ml-1">Attorneys</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center space-x-6">
          {['home', 'practiceAreas', 'results'].map((key) => (
            <button
              key={key}
              onClick={() => key === 'home' ? setRoute('home') : null}
              className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition hover:text-red-500"
            >
              {t.nav[key]}
            </button>
          ))}

          {/* Language Selector */}
          <div className="flex items-center space-x-2 bg-black/40 px-3 py-1 border border-gray-700 rounded-sm">
            <Globe className="h-3 w-3 text-gray-400" />
            <button onClick={() => handleLangChange('en')} className={`text-[10px] font-bold ${lang === 'en' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>English</button>
            <span className="text-gray-600 text-[10px]">|</span>
            <button onClick={() => handleLangChange('es')} className={`text-[10px] font-bold ${lang === 'es' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>Español</button>
            <span className="text-gray-600 text-[10px]">|</span>
            <button onClick={() => handleLangChange('ko')} className={`text-[10px] font-bold ${lang === 'ko' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>한국어</button>
            <span className="text-gray-600 text-[10px]">|</span>
            <button onClick={() => handleLangChange('zh')} className={`text-[10px] font-bold ${lang === 'zh' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}>中文</button>
          </div>

          <a href="tel:555-000-0000" className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg transition transform hover:scale-105 flex items-center border border-red-600 whitespace-nowrap">
            <Phone className="h-3 w-3 mr-2 fill-current" />
            {t.nav.freeConsult}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden text-white flex items-center gap-4 z-50">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-8 w-8 text-red-500" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Full Screen Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#111] z-40 flex flex-col items-center justify-center p-8 space-y-8 animate-fade-in">
            {['home', 'practiceAreas', 'results'].map((key) => (
              <button
                key={key}
                onClick={() => { setRoute('home'); setMobileMenuOpen(false); }}
                className="text-white text-2xl font-serif font-bold uppercase tracking-widest"
              >
                {t.nav[key]}
              </button>
            ))}

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['en', 'es', 'ko', 'zh'].map((l) => (
                <button
                  key={l}
                  onClick={() => { handleLangChange(l); setMobileMenuOpen(false); }}
                  className={`px-4 py-2 border ${lang === l ? 'border-red-600 text-red-500' : 'border-gray-700 text-gray-400'} rounded uppercase font-bold`}
                >
                  {l === 'en' ? 'English' : l === 'es' ? 'Español' : l === 'ko' ? '한국어' : '中文'}
                </button>
              ))}
            </div>

            <a href="tel:555-000-0000" className="bg-red-700 text-white px-8 py-4 w-full text-center font-bold uppercase tracking-widest mt-8">
              {t.nav.freeConsult}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = ({ t }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Rotate slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % t.hero.slogans.length);
        setFade(true); // Fade in
      }, 500); // Wait for fade out to complete
    }, 4000); // Total display time 4s

    return () => clearInterval(interval);
  }, [t.hero.slogans.length]);

  return (
    <div
      className="relative min-h-screen flex items-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.7)), url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 lg:py-48 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="text-white space-y-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <div className="h-1 w-12 bg-red-700"></div>
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Las Vegas Injury Attorneys</span>
          </div>

          <div className="min-h-[120px] md:min-h-[180px] lg:min-h-[220px]">
            <h1
              className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none uppercase tracking-tighter transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
              {t.hero.slogans[index].l1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                {t.hero.slogans[index].l2}
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed border-l-4 border-red-700 pl-6 font-light mx-auto lg:mx-0 text-left">
            {t.hero.subSlogan}
          </p>

          <div className="flex gap-8 pt-6 justify-center lg:justify-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">{t.hero.stat1}</h3>
              <p className="text-xs text-red-500 font-bold uppercase tracking-widest">{t.hero.stat1Label}</p>
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="lg:ml-auto w-full max-w-md mx-auto">
          <IntakeForm t={t} />
        </div>
      </div>
    </div>
  );
};

const MainCategories = ({ t, setRoute }) => (
  <section className="py-24 bg-[#1a1a1a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 border-b border-gray-800 pb-8">
        <div>
          <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Legal Expertise</h2>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t.sections.areasTitle}</h3>
        </div>
        <p className="text-gray-400 max-w-md mt-4 md:mt-0">{t.sections.areasSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-800">
        {CATEGORY_STRUCT.map((cat) => {
          const info = t.categories[cat.id] || { title: 'Unknown', desc: '...' };

          return (
            <div
              key={cat.id}
              onClick={() => setRoute(`category-${cat.id}`)}
              className="group bg-[#1f1f1f] p-10 md:p-14 border border-gray-800 hover:bg-[#252525] hover:border-red-900 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center text-center h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="mb-8 relative z-10 p-6 bg-[#151515] rounded-full group-hover:bg-red-900/20 transition-colors">
                <cat.icon size={48} strokeWidth={1} className="text-white group-hover:text-red-500 transition-colors duration-300" />
              </div>

              <h4 className="relative z-10 font-serif text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors uppercase">
                {info.title}
              </h4>

              <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-8">
                {info.desc}
              </p>

              <span className="relative z-10 text-red-600 text-xs font-bold uppercase tracking-widest border-b border-transparent group-hover:border-red-600 pb-1 transition-all">
                {t.sections.viewAll}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Testimonials = ({ t }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % t.testimonials.reviews.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [t.testimonials.reviews.length]);

  const review = t.testimonials.reviews[index];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-50/50 -z-10"></div>
      <div className="absolute -right-20 -top-20 text-gray-100 opacity-50">
        <Quote size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Testimonials</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">{t.testimonials.title}</h3>

          <div className="inline-flex items-center bg-white shadow-lg rounded-full px-6 py-2 mt-6 border border-gray-100">
            <div className="flex space-x-1 mr-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
            </div>
            <span className="font-bold text-gray-700 text-sm">{t.testimonials.googleRating}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-red-600 relative z-0">
              {/* Adjusted quotation mark for mobile: hidden on small screens, visible on larger */}
              <Quote className="hidden md:block text-red-100 w-16 h-16 absolute top-8 left-8 -z-10" />

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic mb-8 relative z-10 min-h-[120px] flex items-center">
                "{review.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 mr-4">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <div className="flex text-yellow-400 text-xs">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {t.testimonials.reviews.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === index ? 'bg-red-600 w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryPage = ({ catId, t, setRoute }) => {
  const categoryStruct = CATEGORY_STRUCT.find(c => c.id === catId);
  if (!categoryStruct) return null;
  const catInfo = t.categories[catId];
  const relevantAreas = AREA_STRUCT.filter(a => a.categoryId === catId).map(area => ({ ...area, ...t.areas[area.id] }));

  return (
    <div className="bg-[#1a1a1a] min-h-screen pt-20">
      <div className="bg-[#111] py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => setRoute('home')} className="text-gray-400 hover:text-white mb-6 flex items-center text-xs font-bold uppercase tracking-widest hover:text-red-500 transition">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> {t.nav.home}
          </button>
          <div className="flex items-center space-x-4 mb-4">
            <categoryStruct.icon className="text-red-600 h-10 w-10" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white uppercase">{catInfo.title}</h1>
          </div>
          <p className="text-gray-400 max-w-2xl text-lg">{catInfo.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relevantAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => setRoute(`detail-${area.id}`)}
              className="bg-[#222] p-8 hover:bg-[#2a2a2a] transition cursor-pointer border-l-4 border-transparent hover:border-red-600 group"
            >
              <area.icon className="text-gray-400 group-hover:text-white h-8 w-8 mb-4 transition" />
              <h3 className="text-xl font-bold text-white mb-2 font-serif">{area.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{area.desc}</p>
              <div className="flex items-center text-red-600 text-xs font-bold uppercase tracking-wider">
                {t.sections.learnMore} <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-serif">{t.form.title}</h2>
            <p className="text-gray-600">{t.form.subtitle}</p>
          </div>
          <IntakeForm t={t} />
        </div>
      </div>
    </div>
  );
};

const DetailPage = ({ areaId, t, setRoute }) => {
  const areaStruct = AREA_STRUCT.find(a => a.id === areaId);
  if (!areaStruct) return null;
  const areaInfo = t.areas[areaId];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="bg-[#1a1a1a] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button onClick={() => setRoute(`category-${areaStruct.categoryId}`)} className="text-gray-400 hover:text-white mb-6 flex items-center text-xs font-bold uppercase tracking-widest hover:text-red-500 transition">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> {t.nav.practiceAreas}
          </button>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{areaInfo.title}</h1>
          <div className="h-1 w-24 bg-red-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-lg text-gray-700">
              <p className="text-xl leading-relaxed font-serif text-gray-900">
                {t.detailPage.introPart1} <strong>{areaInfo.title}</strong> {t.detailPage.introPart2}
              </p>
              {areaInfo.whatToDo ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.whatToDoTitle}</h3>
                  <div className="whitespace-pre-line mb-8">{areaInfo.whatToDo}</div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.whyTitle}</h3>
                  <p>{t.detailPage.whyText}</p>
                </>
              )}

              <div className="bg-gray-100 p-8 border-l-4 border-red-700 my-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">{t.detailPage.commitTitle}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.detailPage.commitments.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-800 text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {areaInfo.howWeHelp ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.howWeHelpTitle}</h3>
                  <div className="whitespace-pre-line">{areaInfo.howWeHelp}</div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.aboutTitle}</h3>
                  <p>{t.detailPage.aboutText}</p>
                </>
              )}
            </div>
          </div>
          <div className="space-y-8">
            <div className="sticky top-28">
              <IntakeForm t={t} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ t }) => (
  <footer className="bg-[#111111] text-white pt-20 pb-8 border-t border-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-6">
            <div className="bg-red-700 p-1.5 mr-2">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold uppercase leading-none text-white whitespace-nowrap">Car Accident</span>
              <span className="font-serif text-xl font-bold uppercase leading-none text-red-600 whitespace-nowrap">Attorneys</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            We are dedicated to fighting for the rights of the injured. With billions won, our record speaks for itself.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-2 inline-block">Locations</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-red-700 shrink-0" />
              <span>6835 W Tropicana Ave, Ste. 100<br />Las Vegas, NV 89103</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-2 inline-block">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="flex items-center hover:text-white transition">
              <Phone className="h-5 w-5 mr-3 text-red-700" />
              <div className="flex flex-col">
                <span>(702) 469-3000 ({t.footer.mainOffice})</span>
              </div>
            </li>
            <li className="flex items-center hover:text-white transition">
              <Phone className="h-5 w-5 mr-3 text-red-700" />
              <div className="flex flex-col">
                <span>(702) 389-8888 ({t.footer.newClients})</span>
              </div>
            </li>
            <li className="flex items-center hover:text-white transition">
              <DollarSign className="h-5 w-5 mr-3 text-red-700" />
              No Fee Unless We Win
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-2 inline-block">Accolades</h4>
          <div className="flex space-x-4">
            <div className="text-center">
              <Gavel className="h-8 w-8 text-gray-600 mb-1 mx-auto" />
              <span className="text-[10px] text-gray-600 uppercase">Top 100</span>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-gray-600 mb-1 mx-auto" />
              <span className="text-[10px] text-gray-600 uppercase">Super Law</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-gray-600 uppercase tracking-wider">{t.footer.copyright}</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-xs text-gray-600 hover:text-white uppercase tracking-wider">Privacy</a>
          <a href="#" className="text-xs text-gray-600 hover:text-white uppercase tracking-wider">Terms</a>
          <a href="#" className="text-xs text-gray-600 hover:text-white uppercase tracking-wider">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState('en');
  const [route, setRoute] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // --- COOKIE EFFECT ---
  // Check for cookie on initial load
  useEffect(() => {
    const savedLang = getCookie('site_lang');
    if (savedLang && ['en', 'es', 'ko', 'zh'].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Handler to update language and save cookie
  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCookie('site_lang', newLang, 365);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // Helper to determine view
  let content;
  if (route === 'home') {
    content = (
      <>
        <Hero t={t} />
        <MainCategories t={t} setRoute={setRoute} />
        <Testimonials t={t} />
        {/* "We Win" Banner */}
        <section className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1a1a1a] transform -skew-x-12 opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 uppercase tracking-tighter">
              We Don't Just Practice. <br /><span className="text-red-700">We Win.</span>
            </h2>
            <button className="bg-transparent border-2 border-red-700 text-white px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-red-700 transition duration-300">
              View Our Verdicts
            </button>
          </div>
        </section>
      </>
    );
  } else if (route.startsWith('category-')) {
    const catId = route.replace('category-', '');
    content = <CategoryPage catId={catId} t={t} setRoute={setRoute} />;
  } else if (route.startsWith('detail-')) {
    const areaId = route.replace('detail-', '');
    content = <DetailPage areaId={areaId} t={t} setRoute={setRoute} />;
  }

  return (
    <div className="font-sans antialiased text-gray-800 bg-white selection:bg-red-700 selection:text-white">
      <Header
        lang={lang}
        setLang={setLang}
        setRoute={setRoute}
        t={t}
        isScrolled={isScrolled}
        handleLangChange={handleLangChange} // Pass the handler
      />

      <main>
        {content}
      </main>

      <Footer t={t} />
    </div>
  );
}