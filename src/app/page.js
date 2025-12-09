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
      timeLabel: "Approx Time",
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
    detailPage: { introPart1: "At Car Accident Attorneys, we specialize in", introPart2: "cases. If you or a loved one has been injured, you need an aggressive team that understands the complexities of these specific claims.", whyTitle: "Why You Need Representation", whyText: "Insurance companies and large corporations have teams of lawyers working to deny or minimize your claim. Without strong legal representation, you are at a disadvantage. We level the playing field.", commitTitle: "Our Commitment to You:", commitments: ["Zero Upfront Costs", "Medical Care Coordination", "Property Damage Assistance", "Lost Wage Recovery", "Maximum Compensation", "Trial Preparation"], aboutTitle: "About This Claim", aboutText: "We investigate every detail of your case. From gathering surveillance footage to hiring accident reconstruction experts or medical specialists, we leave no stone unturned to prove liability and damages." },
    categories: { 'cat-vehicle': { title: 'Motor Vehicle Accidents', desc: 'Cars, Trucks, Motorcycles, and more.' }, 'cat-products': { title: 'Dangerous Products', desc: 'Defective drugs, medical devices, and consumer products.' }, 'cat-injury': { title: 'Personal Injury', desc: 'Slips, falls, brain injuries, and general negligence.' } },
    areas: { 'car-accidents': { title: 'Auto Accidents', desc: 'Expert legal representation.' }, 'motorcycle': { title: 'Motorcycle Accidents', desc: 'Protecting riders against negligent drivers.' }, 'commercial': { title: 'Truck Accidents', desc: 'Complex litigation involving semi-trucks.' }, 'boating': { title: 'Boating Accidents', desc: 'Injuries on lakes and waterways.' }, 'bus': { title: 'Bus Accidents', desc: 'Public transit and private charter collisions.' }, 'rideshare': { title: 'Uber and Lyft Rideshare', desc: 'Holding rideshare giants accountable.' }, 'pedestrian': { title: 'Pedestrian Accidents', desc: 'Fighting for those injured while walking.' }, 'passenger': { title: 'Passenger Injuries', desc: 'Representation for passengers.' }, 'slip-fall': { title: 'Slip and Fall', desc: 'Premises liability cases.' }, 'construction': { title: 'Construction Zone Accidents', desc: 'Injuries on active construction sites.' }, 'brain': { title: 'Brain Injuries', desc: 'Catastrophic TBI cases.' }, 'mesh': { title: 'Surgical Mesh', desc: 'Defective hernia and vaginal mesh implants.' }, 'hair': { title: 'Hair Relaxer Lawsuit', desc: 'Chemical hair straighteners linked to cancer.' }, 'roundup': { title: 'Roundup', desc: 'Weed killer linked to Non-Hodgkin Lymphoma.' }, 'talc': { title: 'J&J Talcum Powder', desc: 'Cases involving ovarian cancer.' }, 'ozempic': { title: 'Ozempic', desc: 'Gastroparesis and severe stomach paralysis.' }, 'truvada': { title: 'Truvada', desc: 'Kidney disease and bone density loss.' } }
  },
  es: {
    nav: { home: "Inicio", practiceAreas: "Áreas de Práctica", results: "Resultados", contact: "Contáctenos", freeConsult: "Consulta Gratis" },
    hero: { subSlogan: "Representación implacable para víctimas.", stat1: "$1 Billón+", stat1Label: "Recuperado", slogans: [{ l1: "Billones Ganados.", l2: "Ganamos." }, { l1: "Sin Honorarios.", l2: "Hasta Que Ganemos." }, { l1: "Llámenos Antes del 911.", l2: "Podemos Ganar." }, { l1: "Justicia Para Su Lesión.", l2: "Paz Para Su Mente." }] },
    form: { title: "Evaluación Gratuita", subtitle: "Nuestra oficina se comunicará con usted dentro de las 24 horas.", nameLabel: "Nombre Completo", phoneLabel: "Número de Teléfono", emailLabel: "Correo Electrónico", stateLabel: "Estado", dateLabel: "Fecha del Accidente", timeLabel: "Hora", accidentLabel: "Describa el Accidente", injuryLabel: "Tipo de Lesión", submitBtn: "Enviar", disclaimer: "*Al presionar 'Enviar' usted acepta recibir llamadas y notificaciones SMS.", sending: "Enviando...", success: "¡Solicitud Enviada!", error: "Error. Intente de nuevo." },
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
    detailPage: { introPart1: "Nos especializamos en", introPart2: "casos.", whyTitle: "Por Qué Necesita Representación", whyText: "Las compañías de seguros...", commitTitle: "Nuestro Compromiso:", commitments: ["Cero Costos Iniciales"], aboutTitle: "Sobre Este Reclamo", aboutText: "Investigamos cada detalle..." },
    categories: { 'cat-vehicle': { title: 'Accidentes de Vehículos', desc: 'Autos, camiones, etc.' }, 'cat-products': { title: 'Productos Peligrosos', desc: 'Productos defectuosos.' }, 'cat-injury': { title: 'Lesiones Personales', desc: 'Resbalones y caídas.' } },
    areas: { 'car-accidents': { title: 'Accidentes de Auto', desc: 'Representación experta.' }, 'motorcycle': { title: 'Accidentes de Motocicleta', desc: 'Protección para motociclistas.' }, 'commercial': { title: 'Accidentes de Camiones', desc: 'Litigios complejos.' }, 'boating': { title: 'Accidentes de Navegación', desc: 'Lesiones en lagos.' }, 'bus': { title: 'Accidentes de Autobús', desc: 'Colisiones de transporte público.' }, 'rideshare': { title: 'Uber y Lyft', desc: 'Responsabilidad de transporte.' }, 'pedestrian': { title: 'Accidentes de Peatones', desc: 'Luchando por los heridos.' }, 'passenger': { title: 'Lesiones de Pasajeros', desc: 'Representación para pasajeros.' }, 'slip-fall': { title: 'Resbalones y Caídas', desc: 'Responsabilidad de locales.' }, 'construction': { title: 'Accidentes de Construcción', desc: 'Lesiones en construcción.' }, 'brain': { title: 'Lesiones Cerebrales', desc: 'Casos de TBI.' }, 'mesh': { title: 'Malla Quirúrgica', desc: 'Implantes defectuosos.' }, 'hair': { title: 'Alisadores de Cabello', desc: 'Productos químicos.' }, 'roundup': { title: 'Roundup (Glifosato)', desc: 'Litigios de herbicidas.' }, 'talc': { title: 'Talco de J&J', desc: 'Casos de cáncer.' }, 'ozempic': { title: 'Ozempic', desc: 'Problemas estomacales.' }, 'truvada': { title: 'Truvada', desc: 'Enfermedad renal.' } }
  },
  ko: {
    nav: { home: "홈", practiceAreas: "업무 분야", results: "승소 사례", contact: "문의하기", freeConsult: "무료 상담" },
    hero: { subSlogan: "피해자를 위한 끊임없는 대변.", stat1: "$10억+", stat1Label: "보상금 회수", slogans: [{ l1: "수십억 달러 승소.", l2: "우리는 이깁니다." }, { l1: "수임료 0원.", l2: "승소할 때까지." }, { l1: "911보다 먼저 전화하세요.", l2: "우리가 승리합니다." }, { l1: "부상에 대한 정의.", l2: "마음의 평화." }] },
    form: { title: "무료 사건 검토", subtitle: "무료 견적을 받아보세요.", namePlaceholder: "성함", phonePlaceholder: "전화번호", emailPlaceholder: "이메일 주소", detailsPlaceholder: "사건 경위를 말씀해 주세요...", submitBtn: "무료 견적 및 상담 지금 연락하세요", sending: "전송 중...", success: "요청이 전송되었습니다!", error: "오류가 발생했습니다. 다시 시도해 주세요.", stateLabel: "사고 발생 주", dateLabel: "사고 날짜", timeLabel: "대략적인 시간", accidentLabel: "사고 경위", injuryLabel: "부상 유형" },
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
    detailPage: { introPart1: "Car Accident Attorneys는", introPart2: "사건을 전문으로 합니다.", whyTitle: "대리인이 필요한 이유", whyText: "보험 회사와 대기업에는...", commitTitle: "고객에 대한 약속:", commitments: ["초기 비용 0원"], aboutTitle: "이 청구에 대하여", aboutText: "우리는 귀하의 사건에 대한 모든 세부 사항을 조사합니다." },
    categories: { 'cat-vehicle': { title: '자동차 사고', desc: '자동차, 트럭 등' }, 'cat-products': { title: '위험한 제품', desc: '결함이 있는 약물' }, 'cat-injury': { title: '개인 상해', desc: '미끄러짐, 낙상' } },
    areas: { 'car-accidents': { title: '자동차 사고', desc: '전문적인 법률 대리.' }, 'motorcycle': { title: '오토바이 사고', desc: '라이더 보호.' }, 'commercial': { title: '트럭 사고', desc: '복잡한 소송.' }, 'boating': { title: '보트 사고', desc: '부상.' }, 'bus': { title: '버스 사고', desc: '대중 교통.' }, 'rideshare': { title: '우버(Uber) 및 리프트(Lyft)', desc: '승객 안전.' }, 'pedestrian': { title: '보행자 사고', desc: '보행자 보호.' }, 'passenger': { title: '승객 부상', desc: '승객 대리.' }, 'slip-fall': { title: '미끄러짐 및 낙상', desc: '구내 책임.' }, 'construction': { title: '건설 현장 사고', desc: '건설 부상.' }, 'brain': { title: '뇌 손상 (TBI)', desc: '치명적인 TBI.' }, 'mesh': { title: '수술용 메쉬', desc: '결함 있는 임플란트.' }, 'hair': { title: '헤어 릴랙서 소송', desc: '화학 물질.' }, 'roundup': { title: '라운드업 (Roundup)', desc: '제초제 소송.' }, 'talc': { title: 'J&J 베이비 파우더', desc: '활석 제품.' }, 'ozempic': { title: '오젬픽 (Ozempic)', desc: '위마비.' }, 'truvada': { title: '트루바다 (Truvada)', desc: '신장 질환.' } }
  },
  zh: {
    nav: { home: "首页", practiceAreas: "业务领域", results: "成功案例", contact: "联系我们", freeConsult: "免费咨询" },
    hero: { subSlogan: "为受害者提供不懈的法律代表。", stat1: "10亿美元+", stat1Label: "已追回赔偿", slogans: [{ l1: "赢得数十亿赔偿。", l2: "我们必胜。" }, { l1: "不胜诉。", l2: "不收费。" }, { l1: "拨打911之前先致电。", l2: "我们可以赢。" }, { l1: "为您的伤害伸张正义。", l2: "为您的心灵带来安宁。" }] },
    form: { title: "免费案件评估", subtitle: "获取免费估算。", namePlaceholder: "全名", phonePlaceholder: "电话号码", emailPlaceholder: "电子邮箱", detailsPlaceholder: "请告诉我们发生了什么...", submitBtn: "免费估算和咨询 立即联系", sending: "发送中...", success: "请求已发送！", error: "错误。请重试。", stateLabel: "事故发生的州", dateLabel: "事故日期", timeLabel: "大概时间", accidentLabel: "事故描述", injuryLabel: "受伤类型" },
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
    detailPage: { introPart1: "在 Car Accident Attorneys，我们专门处理", introPart2: "案件。", whyTitle: "为什么您需要代理", whyText: "保险公司和大公司...", commitTitle: "我们要向您承诺：", commitments: ["零预付费用"], aboutTitle: "关于此索赔", aboutText: "我们调查您案件的每一个细节。" },
    categories: { 'cat-vehicle': { title: '机动车事故', desc: '汽车、卡车等' }, 'cat-products': { title: '危险产品', desc: '有缺陷的药物' }, 'cat-injury': { title: '人身伤害', desc: '滑倒、跌倒' } },
    areas: { 'car-accidents': { title: '汽车事故', desc: '专家法律代表。' }, 'motorcycle': { title: '摩托车事故', desc: '保护骑手。' }, 'commercial': { title: '卡车事故', desc: '复杂诉讼。' }, 'boating': { title: '划船事故', desc: '伤害。' }, 'bus': { title: '巴士事故', desc: '公共交通。' }, 'rideshare': { title: 'Uber 和 Lyft', desc: '乘客安全。' }, 'pedestrian': { title: '行人事故', desc: '行人保护。' }, 'passenger': { title: '乘客受伤', desc: '乘客代表。' }, 'slip-fall': { title: '滑倒和跌倒', desc: '场所责任。' }, 'construction': { title: '施工区事故', desc: '施工伤害。' }, 'brain': { title: '脑损伤 (TBI)', desc: '严重 TBI。' }, 'mesh': { title: '手术网片', desc: '缺陷植入物。' }, 'hair': { title: '直发剂诉讼', desc: '化学品。' }, 'roundup': { title: '除草剂 (Roundup)', desc: '除草剂诉讼。' }, 'talc': { title: '强生滑石粉', desc: '滑石粉产品。' }, 'ozempic': { title: 'Ozempic (减肥药)', desc: '胃轻瘫。' }, 'truvada': { title: 'Truvada', desc: '肾脏疾病。' } }
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
            onChange={e => setFormData({...formData, firstName: e.target.value})}
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
            onChange={e => setFormData({...formData, phone: e.target.value})}
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
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-900 font-bold mb-1 text-sm">{t.form.stateLabel}</label>
          <div className="relative">
            <select 
              required
              className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition appearance-none"
              value={formData.state}
              onChange={e => setFormData({...formData, state: e.target.value})}
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
              onChange={e => setFormData({...formData, accidentDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-900 font-bold mb-1 text-sm flex items-center">
              <ClockIcon className="w-3 h-3 mr-1" /> {t.form.timeLabel}
            </label>
            <input 
              required
              type="time" 
              className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-gray-900 text-base focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none transition"
              value={formData.accidentTime}
              onChange={e => setFormData({...formData, accidentTime: e.target.value})}
            />
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
            onChange={e => setFormData({...formData, accidentDetails: e.target.value})}
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
            onChange={e => setFormData({...formData, injuryDetails: e.target.value})}
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
              {t.hero.slogans[index].l1}<br/>
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
               {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
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
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
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
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.whyTitle}</h3>
              <p>{t.detailPage.whyText}</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">{t.detailPage.aboutTitle}</h3>
              <p>{t.detailPage.aboutText}</p>
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
              <span>6835 W Tropicana Ave, Ste. 100<br/>Las Vegas, NV 89103</span>
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
                We Don't Just Practice. <br/><span className="text-red-700">We Win.</span>
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