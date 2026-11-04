/*
 * Autoevaluación para el Registro SIR de la Comunitat Valenciana
 * © 2026 Yel Martínez — https://yel-martinez-portfolio.com
 * SPDX-License-Identifier: GPL-2.0-or-later
 * Software libre, sin garantía de ningún tipo. Licencia: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Herramienta independiente y orientativa; no es oficial ni sustituye asesoramiento profesional.
 */
/**
 * Autoevaluacion SIR (Registro de Entidades Valencianas Socialmente Responsables)
 * Scoped under SIR namespace to avoid global conflicts.
 * Calculo e informe generados enteramente en el navegador.
 */
(function() {
"use strict";

var $wrap = document.getElementById('sir-app');
if (!$wrap) return;

// ===================== DATA (ported 1:1 from class-sir-data.php / class-sir-i18n.php) =====================
var SECTIONS = {
  "A": {
    "id": "A",
    "title_es": "Identificación de la entidad",
    "title_va": "Identificació de l'entitat",
    "title_en": "Entity Identification",
    "icon": "building",
    "dimension": "info",
    "fields": [
      {
        "id": "A1",
        "label_es": "Nombre de la entidad",
        "label_va": "Nom de l'entitat",
        "label_en": "Entity name",
        "type": "text",
        "required": true
      },
      {
        "id": "A2",
        "label_es": "NIF/NIE",
        "label_va": "NIF/NIE",
        "label_en": "Tax ID",
        "type": "text",
        "required": true
      },
      {
        "id": "A3",
        "label_es": "Tipo de vía",
        "label_va": "Tipus de via",
        "label_en": "Street type",
        "type": "text"
      },
      {
        "id": "A4",
        "label_es": "Dirección",
        "label_va": "Adreça",
        "label_en": "Address",
        "type": "text"
      },
      {
        "id": "A5",
        "label_es": "Número",
        "label_va": "Número",
        "label_en": "Number",
        "type": "text"
      },
      {
        "id": "A10",
        "label_es": "Provincia",
        "label_va": "Província",
        "label_en": "Province",
        "type": "select",
        "options": [
          "Alicante/Alacant",
          "Castellón/Castelló",
          "Valencia/València"
        ]
      },
      {
        "id": "A11",
        "label_es": "Localidad",
        "label_va": "Localitat",
        "label_en": "City",
        "type": "text"
      },
      {
        "id": "A12",
        "label_es": "Código postal",
        "label_va": "Codi postal",
        "label_en": "Postal code",
        "type": "text"
      }
    ]
  },
  "B": {
    "id": "B",
    "title_es": "Personas empleadas",
    "title_va": "Persones empleades",
    "title_en": "Employees",
    "icon": "users",
    "dimension": "social",
    "doc_es": "Consulte: nóminas, contratos laborales, TC2 de la Seguridad Social, informe de vida laboral de la empresa.",
    "doc_va": "Consulteu: nòmines, contractes laborals, TC2 de la Seguretat Social, informe de vida laboral de l'empresa.",
    "doc_en": "Check: payroll records, employment contracts, Social Security TC2, company work-life report.",
    "fields": [
      {
        "id": "B1",
        "label_es": "Nº personas empleadas totales (año t)",
        "label_va": "Nre. persones empleades totals (any t)",
        "label_en": "Total employees (year t)",
        "type": "number",
        "required": true,
        "help_es": "Suma de individuos con contrato laboral en el año reportado, independientemente de duración o dedicación.",
        "indicator": [
          "SL14",
          "SL15",
          "SL17",
          "SL22",
          "SL26"
        ]
      },
      {
        "id": "B2",
        "label_es": "Nº personas empleadas totales año anterior (t-1)",
        "label_va": "Nre. persones empleades totals any anterior (t-1)",
        "label_en": "Total employees previous year (t-1)",
        "type": "number",
        "required": true
      },
      {
        "id": "B3",
        "label_es": "Nº empleadas mujeres",
        "label_va": "Nre. empleades dones",
        "label_en": "Female employees",
        "type": "number",
        "required": true,
        "help_es": "Número de mujeres con contrato laboral en el año reportado."
      },
      {
        "id": "B4",
        "label_es": "Nº empleadas mujeres año anterior (t-1)",
        "label_va": "Nre. empleades dones any anterior (t-1)",
        "label_en": "Female employees (t-1)",
        "type": "number"
      },
      {
        "id": "B5",
        "label_es": "Nº personas empleadas menores de 30 años",
        "label_va": "Nre. persones empleades menors de 30 anys",
        "label_en": "Employees under 30",
        "type": "number",
        "indicator": [
          "SL14"
        ]
      },
      {
        "id": "B6",
        "label_es": "Nº personas empleadas mayores de 50 años",
        "label_va": "Nre. persones empleades majors de 50 anys",
        "label_en": "Employees over 50",
        "type": "number",
        "indicator": [
          "SL15"
        ]
      },
      {
        "id": "B7",
        "label_es": "Nº personas con contrato indefinido",
        "label_va": "Nre. persones amb contracte indefinit",
        "label_en": "Permanent contracts",
        "type": "number",
        "indicator": [
          "SL17"
        ]
      },
      {
        "id": "B8",
        "label_es": "Nº total de horas contratadas (año t)",
        "label_va": "Nre. total d'hores contractades (any t)",
        "label_en": "Total contracted hours (year t)",
        "type": "number",
        "required": true,
        "help_es": "Total de horas de todos los contratos del año. Se usa para calcular personas equivalentes a tiempo completo (ETC)."
      },
      {
        "id": "B9",
        "label_es": "Nº total de horas contratadas año anterior (t-1)",
        "label_va": "Nre. total d'hores contractades any anterior (t-1)",
        "label_en": "Total contracted hours (t-1)",
        "type": "number",
        "required": true
      }
    ]
  },
  "C": {
    "id": "C",
    "title_es": "Personas directivas",
    "title_va": "Persones directives",
    "title_en": "Management",
    "icon": "user-tie",
    "dimension": "social",
    "doc_es": "Consulte: escrituras de la sociedad, actas de nombramientos, organigrama.",
    "doc_va": "Consulteu: escriptures de la societat, actes de nomenaments, organigrama.",
    "doc_en": "Check: company deeds, appointment records, organization chart.",
    "fields": [
      {
        "id": "C1",
        "label_es": "Nº total de personas directivas",
        "label_va": "Nre. total de persones directives",
        "label_en": "Total managers",
        "type": "number",
        "required": true,
        "help_es": "Solo miembros del equipo de dirección. No incluir mandos intermedios ni responsables de área.",
        "indicator": [
          "SL5"
        ]
      },
      {
        "id": "C2",
        "label_es": "Nº de mujeres directivas",
        "label_va": "Nre. de dones directives",
        "label_en": "Female managers",
        "type": "number",
        "required": true,
        "indicator": [
          "SL5"
        ]
      }
    ]
  },
  "D": {
    "id": "D",
    "title_es": "Entorno laboral",
    "title_va": "Entorn laboral",
    "title_en": "Work Environment",
    "icon": "hard-hat",
    "dimension": "social",
    "doc_es": "Consulte: registro de bajas/altas, partes de accidente, informe de prevención de riesgos laborales, registros de permisos.",
    "doc_va": "Consulteu: registre de baixes/altes, parts d'accident, informe de prevenció de riscos laborals, registres de permisos.",
    "doc_en": "Check: leave records, accident reports, occupational risk prevention report, leave registers.",
    "fields": [
      {
        "id": "D1",
        "label_es": "Nº personas que dejan la organización (voluntariamente, despido, jubilación o fallecimiento)",
        "label_va": "Nre. persones que deixen l'organització",
        "label_en": "Employees leaving organization",
        "type": "number",
        "indicator": [
          "SL22",
          "SL10"
        ]
      },
      {
        "id": "D2",
        "label_es": "Nº empleadas mujeres que dejan la organización",
        "label_va": "Nre. empleades dones que deixen l'organització",
        "label_en": "Female employees leaving",
        "type": "number",
        "indicator": [
          "SL10"
        ]
      },
      {
        "id": "D3",
        "label_es": "Nº de accidentes con baja",
        "label_va": "Nre. d'accidents amb baixa",
        "label_en": "Accidents with sick leave",
        "type": "number",
        "indicator": [
          "SL26"
        ]
      },
      {
        "id": "D4",
        "label_es": "Nº fallecimientos por accidente laboral o enfermedad profesional",
        "label_va": "Nre. defuncions per accident laboral o malaltia professional",
        "label_en": "Work-related fatalities",
        "type": "number",
        "indicator": [
          "SL27"
        ]
      },
      {
        "id": "D5",
        "label_es": "Nº de horas trabajadas",
        "label_va": "Nre. d'hores treballades",
        "label_en": "Hours worked",
        "type": "number",
        "help_es": "Total de horas efectivamente trabajadas durante el año.",
        "indicator": [
          "SL27"
        ]
      },
      {
        "id": "D6",
        "label_es": "Nº empleadas mujeres acogidas a permiso maternal",
        "label_va": "Nre. empleades dones acollides a permís maternal",
        "label_en": "Women on maternity leave",
        "type": "number",
        "indicator": [
          "SL35"
        ]
      },
      {
        "id": "D7",
        "label_es": "Nº empleadas mujeres con derecho a permiso maternal",
        "label_va": "Nre. empleades dones amb dret a permís maternal",
        "label_en": "Women entitled to maternity leave",
        "type": "number",
        "indicator": [
          "SL35"
        ]
      },
      {
        "id": "D8",
        "label_es": "Nº empleados hombres acogidos a permiso parental",
        "label_va": "Nre. empleats homes acollits a permís parental",
        "label_en": "Men on paternity leave",
        "type": "number",
        "indicator": [
          "SL36"
        ]
      },
      {
        "id": "D9",
        "label_es": "Nº empleados hombres con derecho a permiso parental",
        "label_va": "Nre. empleats homes amb dret a permís parental",
        "label_en": "Men entitled to paternity leave",
        "type": "number",
        "indicator": [
          "SL36"
        ]
      }
    ]
  },
  "F": {
    "id": "F",
    "title_es": "Salarios",
    "title_va": "Salaris",
    "title_en": "Salaries",
    "icon": "euro-sign",
    "dimension": "social",
    "doc_es": "Consulte: nóminas, modelo 190 de la AEAT, certificados de retenciones, resumen anual de salarios.",
    "doc_va": "Consulteu: nòmines, model 190 de l'AEAT, certificats de retencions, resum anual de salaris.",
    "doc_en": "Check: payroll, AEAT form 190, withholding certificates, annual salary summary.",
    "fields": [
      {
        "id": "F1",
        "label_es": "Salario promedio anual de empleadas mujeres (€)",
        "label_va": "Salari mitjà anual d'empleades dones (€)",
        "label_en": "Average annual salary — women (€)",
        "type": "number",
        "step": "0.01",
        "help_es": "Media aritmética de salarios brutos anualizados de mujeres a tiempo completo. Para temporales: salario mensual × 12.",
        "indicator": [
          "SL3"
        ]
      },
      {
        "id": "F2",
        "label_es": "Salario promedio anual de empleados hombres (€)",
        "label_va": "Salari mitjà anual d'empleats homes (€)",
        "label_en": "Average annual salary — men (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "SL3"
        ]
      },
      {
        "id": "F3",
        "label_es": "Salario bruto anual más bajo de la entidad (€)",
        "label_va": "Salari brut anual més baix de l'entitat (€)",
        "label_en": "Lowest gross annual salary (€)",
        "type": "number",
        "step": "0.01",
        "help_es": "Salario bruto anual más bajo entre personas empleadas a tiempo completo.",
        "indicator": [
          "SL18",
          "SL19"
        ]
      },
      {
        "id": "F5",
        "label_es": "Salario bruto anual más alto de la entidad (€)",
        "label_va": "Salari brut anual més alt de l'entitat (€)",
        "label_en": "Highest gross annual salary (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "SL19"
        ]
      }
    ]
  },
  "N": {
    "id": "N",
    "title_es": "Formación",
    "title_va": "Formació",
    "title_en": "Training",
    "icon": "graduation-cap",
    "dimension": "social",
    "doc_es": "Consulte: registros de formación, certificados de cursos, facturas de formadores. Incluye formación vocacional, excedencias pagadas para formación, formación externa pagada total o parcialmente. NO incluye jornadas de orientación/acogida.",
    "doc_va": "Consulteu: registres de formació, certificats de cursos, factures de formadors.",
    "doc_en": "Check: training records, course certificates, trainer invoices.",
    "fields": [
      {
        "id": "N1",
        "label_es": "Horas de formación totales impartidas",
        "label_va": "Hores de formació totals impartides",
        "label_en": "Total training hours",
        "type": "number",
        "indicator": [
          "SL11"
        ]
      },
      {
        "id": "N2",
        "label_es": "Horas de formación impartidas a empleadas mujeres",
        "label_va": "Hores de formació impartides a empleades dones",
        "label_en": "Training hours for women",
        "type": "number",
        "indicator": [
          "SL11"
        ]
      }
    ]
  },
  "H": {
    "id": "H",
    "title_es": "Metodologías y memorias",
    "title_va": "Metodologies i memòries",
    "title_en": "Methodologies & Reports",
    "icon": "shield-check",
    "dimension": "etico",
    "doc_es": "Aspectos éticos: gestión de riesgos ASG, disponibilidad web, memorias de actividades.",
    "doc_va": "Aspectes ètics: gestió de riscos ASG, disponibilitat web, memòries d'activitats.",
    "doc_en": "Ethical aspects: ESG risk management, web availability, activity reports.",
    "fields": [
      {
        "id": "H1",
        "label_es": "¿La entidad identifica riesgos materiales ASG?",
        "label_va": "L'entitat identifica riscos materials ASG?",
        "label_en": "Does the entity identify material ESG risks?",
        "type": "select",
        "options_es": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        },
        "options_va": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        },
        "options_en": {
          "": "Select",
          "si": "Yes",
          "no": "No"
        },
        "help_es": "Implementación de una metodología de identificación de riesgos materiales ASG a corto, medio y largo plazo, incluyendo cadena de suministro.",
        "indicator": [
          "ET6"
        ]
      },
      {
        "id": "H2",
        "label_es": "¿La entidad mitiga riesgos materiales ASG?",
        "label_va": "L'entitat mitiga riscos materials ASG?",
        "label_en": "Does the entity mitigate material ESG risks?",
        "type": "select",
        "options_es": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        },
        "options_va": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        },
        "options_en": {
          "": "Select",
          "si": "Yes",
          "no": "No"
        },
        "indicator": [
          "ET8"
        ]
      },
      {
        "id": "H3",
        "label_es": "¿La entidad dispone de web?",
        "label_va": "L'entitat disposa de web?",
        "label_en": "Does the entity have a website?",
        "type": "select",
        "options_es": {
          "": "Seleccionar",
          "si_acc": "Sí, accesible a personas con diversidad funcional",
          "si": "Sí, pero no garantiza accesibilidad",
          "no": "No"
        },
        "options_va": {
          "": "Seleccionar",
          "si_acc": "Sí, accessible",
          "si": "Sí, però no garanteix accessibilitat",
          "no": "No"
        },
        "options_en": {
          "": "Select",
          "si_acc": "Yes, accessible",
          "si": "Yes, not fully accessible",
          "no": "No"
        },
        "indicator": [
          "ET20"
        ]
      },
      {
        "id": "H4",
        "label_es": "¿La entidad elabora memoria anual de actividades?",
        "label_va": "L'entitat elabora memòria anual d'activitats?",
        "label_en": "Does the entity prepare an annual activity report?",
        "type": "select",
        "options_es": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        },
        "options_va": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        },
        "options_en": {
          "": "Select",
          "si": "Yes",
          "no": "No"
        },
        "help_es": "Memoria donde se informe sobre compromisos, actividades y desempeño en materia ASG.",
        "indicator": [
          "ET22"
        ]
      }
    ]
  },
  "J": {
    "id": "J",
    "title_es": "Datos económicos",
    "title_va": "Dades econòmiques",
    "title_en": "Economic Data",
    "icon": "chart-line",
    "dimension": "economico",
    "doc_es": "Consulte: cuentas anuales (balance, cuenta de pérdidas y ganancias), modelo 200/202 del Impuesto de Sociedades, libros contables.",
    "doc_va": "Consulteu: comptes anuals (balanç, compte de pèrdues i guanys), model 200/202 de l'Impost de Societats, llibres comptables.",
    "doc_en": "Check: annual accounts (balance sheet, P&L), corporate tax forms 200/202, accounting books.",
    "fields": [
      {
        "id": "J1",
        "label_es": "Beneficio después de impuestos (€)",
        "label_va": "Benefici després d'impostos (€)",
        "label_en": "Profit after tax (€)",
        "type": "number",
        "step": "0.01",
        "help_es": "Resultado del ejercicio tras impuestos. Puede ser negativo.",
        "indicator": [
          "ID3"
        ]
      },
      {
        "id": "J2",
        "label_es": "Beneficio antes de intereses e impuestos — BAII (€)",
        "label_va": "Benefici abans d'interessos i impostos — BAII (€)",
        "label_en": "EBIT (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "ID4",
          "ID6"
        ]
      },
      {
        "id": "J3",
        "label_es": "Saldo medio de acreedores comerciales (€)",
        "label_va": "Saldo mitjà de creditors comercials (€)",
        "label_en": "Average trade payables (€)",
        "type": "number",
        "step": "0.01",
        "help_es": "Media entre saldo de acreedores a 31/12 del año t y del año t-1.",
        "indicator": [
          "ET19"
        ]
      },
      {
        "id": "J4",
        "label_es": "Compras netas y gastos por servicios exteriores (€)",
        "label_va": "Compres netes i despeses per serveis exteriors (€)",
        "label_en": "Net purchases + external services (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "ET19"
        ]
      },
      {
        "id": "J5",
        "label_es": "Ventas totales (€)",
        "label_va": "Vendes totals (€)",
        "label_en": "Total sales (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "AM2"
        ]
      },
      {
        "id": "J6",
        "label_es": "Ventas totales en volumen (unidades del sector)",
        "label_va": "Vendes totals en volum",
        "label_en": "Total sales in volume",
        "type": "number",
        "step": "0.01",
        "help_es": "Ventas expresadas en la unidad de medida habitual del sector.",
        "indicator": [
          "AM8",
          "AM10"
        ]
      },
      {
        "id": "J7",
        "label_es": "Unidad de medida",
        "label_va": "Unitat de mesura",
        "label_en": "Unit of measure",
        "type": "select",
        "options_es": {
          "": "Seleccionar",
          "cu": "clientes/usuarios",
          "co": "contenedores",
          "d": "días",
          "ha": "hectáreas",
          "h": "horas",
          "kg": "kilos",
          "km": "kilómetros",
          "l": "litros",
          "m": "metros",
          "m2": "metros²",
          "m3": "metros³",
          "t": "toneladas",
          "w": "vatios",
          "Ot": "Otras"
        }
      },
      {
        "id": "J9",
        "label_es": "Ventas totales en volumen año anterior (t-1)",
        "label_va": "Vendes totals en volum any anterior (t-1)",
        "label_en": "Total sales in volume (t-1)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "AM8",
          "AM10"
        ]
      }
    ]
  },
  "K": {
    "id": "K",
    "title_es": "Datos económicos (2)",
    "title_va": "Dades econòmiques (2)",
    "title_en": "Economic Data (2)",
    "icon": "balance-scale",
    "dimension": "economico",
    "doc_es": "Consulte: balance de situación de las cuentas anuales.",
    "doc_va": "Consulteu: balanç de situació dels comptes anuals.",
    "doc_en": "Check: balance sheet from annual accounts.",
    "fields": [
      {
        "id": "K1",
        "label_es": "Patrimonio neto (€)",
        "label_va": "Patrimoni net (€)",
        "label_en": "Net equity (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "ID3",
          "ID5"
        ]
      },
      {
        "id": "K2",
        "label_es": "Activo total (€)",
        "label_va": "Actiu total (€)",
        "label_en": "Total assets (€)",
        "type": "number",
        "step": "0.01",
        "indicator": [
          "ID4"
        ]
      },
      {
        "id": "K3",
        "label_es": "Pasivo exigible (€)",
        "label_va": "Passiu exigible (€)",
        "label_en": "Total liabilities (€)",
        "type": "number",
        "step": "0.01",
        "help_es": "Pasivo corriente + pasivo no corriente.",
        "indicator": [
          "ID5"
        ]
      }
    ]
  },
  "L": {
    "id": "L",
    "title_es": "Consumo y medio ambiente",
    "title_va": "Consum i medi ambient",
    "title_en": "Consumption & Environment",
    "icon": "leaf",
    "dimension": "ambiental",
    "doc_es": "Consulte: facturas de electricidad (kWh y origen renovable/no renovable en el certificado de la comercializadora), facturas de gas/combustible, facturas de agua, certificados de gestión de residuos, registro de producción de residuos, documentos de control y seguimiento de residuos peligrosos.",
    "doc_va": "Consulteu: factures d'electricitat, factures de gas/combustible, factures d'aigua, certificats de gestió de residus.",
    "doc_en": "Check: electricity bills (kWh, renewable origin certificate), gas/fuel bills, water bills, waste management certificates.",
    "fields": [
      {
        "id": "L1",
        "label_es": "Toneladas de CO₂ equivalente (año t)",
        "label_va": "Tones de CO₂ equivalent (any t)",
        "label_en": "Tonnes CO₂ equivalent (year t)",
        "type": "number",
        "step": "0.001",
        "help_es": "Emisiones alcance 1 (combustibles, procesos propios) + alcance 2 (electricidad comprada). Consulte la Guía de huella de carbono del MITECO.",
        "indicator": [
          "AM1",
          "AM2",
          "AMN1"
        ]
      },
      {
        "id": "L2",
        "label_es": "Toneladas de CO₂ equivalente año anterior (t-1)",
        "label_va": "Tones de CO₂ equivalent any anterior (t-1)",
        "label_en": "Tonnes CO₂ equivalent (t-1)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AMN1"
        ]
      },
      {
        "id": "L3",
        "label_es": "Consumo combustibles fósiles kWh (año t)",
        "label_va": "Consum combustibles fòssils kWh (any t)",
        "label_en": "Fossil fuel consumption kWh (year t)",
        "type": "number",
        "indicator": [
          "AM9"
        ]
      },
      {
        "id": "L4",
        "label_es": "Consumo combustibles fósiles kWh (t-1)",
        "label_va": "Consum combustibles fòssils kWh (t-1)",
        "label_en": "Fossil fuel kWh (t-1)",
        "type": "number",
        "indicator": [
          "AM9"
        ]
      },
      {
        "id": "L5",
        "label_es": "Electricidad origen renovable kWh (año t)",
        "label_va": "Electricitat origen renovable kWh (any t)",
        "label_en": "Renewable electricity kWh (year t)",
        "type": "number",
        "help_es": "Electricidad cuya comercializadora certifique origen renovable, o autoconsumo.",
        "indicator": [
          "AM9"
        ]
      },
      {
        "id": "L6",
        "label_es": "Electricidad origen renovable kWh (t-1)",
        "label_va": "Electricitat origen renovable kWh (t-1)",
        "label_en": "Renewable electricity kWh (t-1)",
        "type": "number"
      },
      {
        "id": "L7",
        "label_es": "Electricidad origen no renovable kWh (año t)",
        "label_va": "Electricitat origen no renovable kWh (any t)",
        "label_en": "Non-renewable electricity kWh (year t)",
        "type": "number",
        "indicator": [
          "AM9"
        ]
      },
      {
        "id": "L8",
        "label_es": "Electricidad origen no renovable kWh (t-1)",
        "label_va": "Electricitat origen no renovable kWh (t-1)",
        "label_en": "Non-renewable electricity kWh (t-1)",
        "type": "number"
      },
      {
        "id": "L9",
        "label_es": "Consumo energía total kWh (año t)",
        "label_va": "Consum energia total kWh (any t)",
        "label_en": "Total energy kWh (year t)",
        "type": "number",
        "computed": true,
        "formula_es": "= Combustibles + Electricidad renovable + No renovable",
        "indicator": [
          "AM9",
          "AM10"
        ]
      },
      {
        "id": "L10",
        "label_es": "Consumo energía total kWh (t-1)",
        "label_va": "Consum energia total kWh (t-1)",
        "label_en": "Total energy kWh (t-1)",
        "type": "number",
        "computed": true,
        "indicator": [
          "AM10"
        ]
      },
      {
        "id": "L11",
        "label_es": "Agua suministro red pública (litros)",
        "label_va": "Aigua subministrament xarxa pública (litres)",
        "label_en": "Public water supply (liters)",
        "type": "number",
        "help_es": "Según facturas del servicio de agua.",
        "indicator": [
          "AM7"
        ]
      },
      {
        "id": "L12",
        "label_es": "Agua extracción en parcela (litros)",
        "label_va": "Aigua extracció en parcel·la (litres)",
        "label_en": "On-site water extraction (liters)",
        "type": "number"
      },
      {
        "id": "L13",
        "label_es": "Agua reciclada o reutilizada (litros)",
        "label_va": "Aigua reciclada o reutilitzada (litres)",
        "label_en": "Recycled/reused water (liters)",
        "type": "number"
      },
      {
        "id": "L14",
        "label_es": "Vertido de agua (litros)",
        "label_va": "Abocament d'aigua (litres)",
        "label_en": "Water discharge (liters)",
        "type": "number",
        "indicator": [
          "AMN7"
        ]
      },
      {
        "id": "L15",
        "label_es": "Consumo total de agua (litros) año t",
        "label_va": "Consum total d'aigua (litres) any t",
        "label_en": "Total water consumption (liters) year t",
        "type": "number",
        "computed": true,
        "formula_es": "= Red pública + Extracción + Reciclada - Vertido",
        "indicator": [
          "AM7",
          "AM8",
          "AMN7"
        ]
      },
      {
        "id": "L16",
        "label_es": "Consumo total de agua (litros) año t-1",
        "label_va": "Consum total d'aigua (litres) any t-1",
        "label_en": "Total water (liters) year t-1",
        "type": "number",
        "indicator": [
          "AM8"
        ]
      },
      {
        "id": "L17",
        "label_es": "Emisiones compensadas (toneladas)",
        "label_va": "Emissions compensades (tones)",
        "label_en": "Offset emissions (tonnes)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AMN1"
        ]
      },
      {
        "id": "L18",
        "label_es": "Suelo uso naturalmente orientado m² (SON)",
        "label_va": "Sòl ús naturalment orientat m² (SON)",
        "label_en": "Nature-oriented land m² (SON)",
        "type": "number",
        "help_es": "Áreas dedicadas a conservación/restauración de naturaleza (tejados verdes, jardines biodiversos, etc.).",
        "indicator": [
          "AMN3"
        ]
      },
      {
        "id": "L19",
        "label_es": "Suelo sellado o impermeabilizado m² (SS)",
        "label_va": "Sòl segellat o impermeabilitzat m² (SS)",
        "label_en": "Sealed/impervious land m² (SS)",
        "type": "number",
        "indicator": [
          "AMN3"
        ]
      },
      {
        "id": "L20",
        "label_es": "Materias primas regenerativas (toneladas)",
        "label_va": "Matèries primeres regeneratives (tones)",
        "label_en": "Regenerative raw materials (tonnes)",
        "type": "number",
        "indicator": [
          "AMN5"
        ]
      },
      {
        "id": "L21",
        "label_es": "Materias primas recicladas (toneladas)",
        "label_va": "Matèries primeres reciclades (tones)",
        "label_en": "Recycled raw materials (tonnes)",
        "type": "number",
        "indicator": [
          "AMN5"
        ]
      },
      {
        "id": "L22",
        "label_es": "Materias primas reutilizadas (toneladas)",
        "label_va": "Matèries primeres reutilitzades (tones)",
        "label_en": "Reused raw materials (tonnes)",
        "type": "number",
        "indicator": [
          "AMN5"
        ]
      },
      {
        "id": "L23",
        "label_es": "Materias primas totales (toneladas)",
        "label_va": "Matèries primeres totals (tones)",
        "label_en": "Total raw materials (tonnes)",
        "type": "number",
        "indicator": [
          "AMN5"
        ]
      },
      {
        "id": "L24",
        "label_es": "Residuos reciclados no peligrosos (Tn)",
        "label_va": "Residus reciclats no perillosos (Tn)",
        "label_en": "Recycled non-hazardous waste (T)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AM4",
          "AM5"
        ]
      },
      {
        "id": "L25",
        "label_es": "Residuos reutilizados no peligrosos (Tn)",
        "label_va": "Residus reutilitzats no perillosos (Tn)",
        "label_en": "Reused non-hazardous waste (T)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AM4",
          "AM5"
        ]
      },
      {
        "id": "L26",
        "label_es": "Residuos reciclados peligrosos (Tn)",
        "label_va": "Residus reciclats perillosos (Tn)",
        "label_en": "Recycled hazardous waste (T)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AM4",
          "AM5"
        ]
      },
      {
        "id": "L27",
        "label_es": "Residuos reutilizados peligrosos (Tn)",
        "label_va": "Residus reutilitzats perillosos (Tn)",
        "label_en": "Reused hazardous waste (T)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AM4",
          "AM5"
        ]
      },
      {
        "id": "L28",
        "label_es": "Residuos a eliminación no peligrosos (Tn)",
        "label_va": "Residus a eliminació no perillosos (Tn)",
        "label_en": "Non-hazardous waste for disposal (T)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AM4",
          "AM5"
        ]
      },
      {
        "id": "L29",
        "label_es": "Residuos a eliminación peligrosos (Tn)",
        "label_va": "Residus a eliminació perillosos (Tn)",
        "label_en": "Hazardous waste for disposal (T)",
        "type": "number",
        "step": "0.001",
        "indicator": [
          "AM4",
          "AM5"
        ]
      }
    ]
  },
  "O": {
    "id": "O",
    "title_es": "Cumplimiento adicional",
    "title_va": "Compliment addicional",
    "title_en": "Additional Compliance",
    "icon": "star",
    "dimension": "info",
    "fields": [
      {
        "id": "O1",
        "label_es": "¿Cumplimiento voluntario adicional?",
        "label_va": "Compliment voluntari addicional?",
        "label_en": "Additional voluntary compliance?",
        "type": "select",
        "options_es": {
          "": "Seleccionar",
          "si": "Sí",
          "no": "No"
        }
      },
      {
        "id": "O2",
        "label_es": "Factor o mérito susceptible de valoración",
        "label_va": "Factor o mèrit susceptible de valoració",
        "label_en": "Merit factor",
        "type": "textarea"
      }
    ]
  }
};

var INDICATORS = {
  "SL3": {
    "code": "SL3",
    "name_es": "Igualdad salarial",
    "name_va": "Igualtat salarial",
    "name_en": "Salary equality",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "Salario promedio mujeres / Salario promedio hombres",
    "levels": [
      {
        "level": 0,
        "min": null,
        "max": null,
        "points": 0,
        "desc_es": "No reporta o ratio <0.70 o >1.30"
      },
      {
        "level": 1,
        "ranges": [
          [
            0.7,
            0.79
          ],
          [
            1.21,
            1.3
          ]
        ],
        "points": 0.5,
        "desc_es": "Ratio 0.70-0.79 o 1.21-1.30"
      },
      {
        "level": 2,
        "ranges": [
          [
            0.8,
            0.89
          ],
          [
            1.11,
            1.2
          ]
        ],
        "points": 1,
        "desc_es": "Ratio 0.80-0.89 o 1.11-1.20"
      },
      {
        "level": 3,
        "ranges": [
          [
            0.9,
            1.1
          ]
        ],
        "points": 1.5,
        "desc_es": "Ratio 0.90-1.10"
      }
    ]
  },
  "SL5": {
    "code": "SL5",
    "name_es": "Igualdad directiva",
    "name_va": "Igualtat directiva",
    "name_en": "Management equality",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "Nº mujeres directivas / Nº total directivas",
    "levels": [
      {
        "level": 0,
        "points": 0,
        "desc_es": "No reporta"
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.2
          ],
          [
            0.8,
            1
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.21,
            0.45
          ],
          [
            0.55,
            0.79
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.46,
            0.54
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL10": {
    "code": "SL10",
    "name_es": "Igualdad en estabilidad laboral",
    "name_va": "Igualtat en estabilitat laboral",
    "name_en": "Employment stability equality",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "Tasa rotación mujeres / Tasa rotación total",
    "levels": [
      {
        "level": 0,
        "points": 0,
        "desc_es": "No reporta"
      },
      {
        "level": 1,
        "condition": "<0.85 o >1.15",
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.85,
            0.94
          ],
          [
            1.06,
            1.15
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.95,
            1.05
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL11": {
    "code": "SL11",
    "name_es": "Igualdad en formación",
    "name_va": "Igualtat en formació",
    "name_en": "Training equality",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "Horas formación mujeres / Horas formación total",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.2
          ],
          [
            0.8,
            1
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.21,
            0.45
          ],
          [
            0.55,
            0.79
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.46,
            0.54
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL14": {
    "code": "SL14",
    "name_es": "Empleo juvenil",
    "name_va": "Ocupació juvenil",
    "name_en": "Youth employment",
    "dimension": "social",
    "max_points": 1,
    "max_level": 3,
    "formula_es": "Empleados <30 años / Total empleados",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.09
          ]
        ],
        "points": 0.33
      },
      {
        "level": 2,
        "ranges": [
          [
            0.1,
            0.19
          ]
        ],
        "points": 0.66
      },
      {
        "level": 3,
        "ranges": [
          [
            0.2,
            999
          ]
        ],
        "points": 1
      }
    ]
  },
  "SL15": {
    "code": "SL15",
    "name_es": "Empleo a mayores",
    "name_va": "Ocupació a majors",
    "name_en": "Senior employment",
    "dimension": "social",
    "max_points": 1,
    "max_level": 3,
    "formula_es": "Empleados >50 años / Total empleados",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.09
          ]
        ],
        "points": 0.33
      },
      {
        "level": 2,
        "ranges": [
          [
            0.1,
            0.19
          ]
        ],
        "points": 0.66
      },
      {
        "level": 3,
        "ranges": [
          [
            0.2,
            999
          ]
        ],
        "points": 1
      }
    ]
  },
  "SL17": {
    "code": "SL17",
    "name_es": "Estabilidad del empleo",
    "name_va": "Estabilitat de l'ocupació",
    "name_en": "Employment stability",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "Contratos indefinidos / Total empleados",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.33
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.34,
            0.66
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.67,
            1
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL18": {
    "code": "SL18",
    "name_es": "Dignidad salarial",
    "name_va": "Dignitat salarial",
    "name_en": "Wage dignity",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 4,
    "formula_es": "Salario más bajo / SMI anual",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            1,
            1.1
          ]
        ],
        "points": 0.38
      },
      {
        "level": 2,
        "ranges": [
          [
            1.11,
            1.2
          ]
        ],
        "points": 0.76
      },
      {
        "level": 3,
        "ranges": [
          [
            1.21,
            1.3
          ]
        ],
        "points": 1.14
      },
      {
        "level": 4,
        "ranges": [
          [
            1.31,
            999
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL19": {
    "code": "SL19",
    "name_es": "Ratio diferencia salarial",
    "name_va": "Ràtio diferència salarial",
    "name_en": "Salary gap ratio",
    "dimension": "social",
    "max_points": 1,
    "max_level": 5,
    "formula_es": "Salario más alto / Salario más bajo",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            30,
            9999
          ]
        ],
        "points": 0.2
      },
      {
        "level": 2,
        "ranges": [
          [
            25,
            29.99
          ]
        ],
        "points": 0.4
      },
      {
        "level": 3,
        "ranges": [
          [
            20,
            24.99
          ]
        ],
        "points": 0.6
      },
      {
        "level": 4,
        "ranges": [
          [
            15,
            19.99
          ]
        ],
        "points": 0.8
      },
      {
        "level": 5,
        "ranges": [
          [
            0,
            14.99
          ]
        ],
        "points": 1
      }
    ]
  },
  "SL22": {
    "code": "SL22",
    "name_es": "Tasa de rotación",
    "name_va": "Taxa de rotació",
    "name_en": "Turnover rate",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "Personas que dejan entidad / Nº medio empleados",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0.27,
            999
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.15,
            0.26
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0,
            0.1499
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL26": {
    "code": "SL26",
    "name_es": "Accidentalidad (índice incidencia)",
    "name_va": "Accidentalitat (índex incidència)",
    "name_en": "Accident rate",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 3,
    "formula_es": "(Accidentes con baja / Nº medio empleados) × 1000",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            25.001,
            9999
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            5,
            25
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0,
            4.999
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL27": {
    "code": "SL27",
    "name_es": "Siniestralidad",
    "name_va": "Sinistralitat",
    "name_en": "Fatality rate",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 4,
    "formula_es": "(Fallecimientos / Horas trabajadas) × 1.000.000",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            40.001,
            9999
          ]
        ],
        "points": 0.38
      },
      {
        "level": 2,
        "ranges": [
          [
            10.001,
            40
          ]
        ],
        "points": 0.76
      },
      {
        "level": 3,
        "ranges": [
          [
            0.01,
            10
          ]
        ],
        "points": 1.14
      },
      {
        "level": 4,
        "ranges": [
          [
            0,
            0
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL35": {
    "code": "SL35",
    "name_es": "Derechos permiso maternal",
    "name_va": "Drets permís maternal",
    "name_en": "Maternity leave rights",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 4,
    "formula_es": "Mujeres acogidas permiso / Mujeres con derecho",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.9399
          ]
        ],
        "points": 0.38
      },
      {
        "level": 2,
        "ranges": [
          [
            0.94,
            0.96
          ]
        ],
        "points": 0.76
      },
      {
        "level": 3,
        "ranges": [
          [
            0.97,
            0.99
          ]
        ],
        "points": 1.14
      },
      {
        "level": 4,
        "ranges": [
          [
            1,
            1
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "SL36": {
    "code": "SL36",
    "name_es": "Derechos permiso paternal",
    "name_va": "Drets permís paternal",
    "name_en": "Paternity leave rights",
    "dimension": "social",
    "max_points": 1.5,
    "max_level": 4,
    "formula_es": "Hombres acogidos permiso / Hombres con derecho",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.9399
          ]
        ],
        "points": 0.38
      },
      {
        "level": 2,
        "ranges": [
          [
            0.94,
            0.96
          ]
        ],
        "points": 0.76
      },
      {
        "level": 3,
        "ranges": [
          [
            0.97,
            0.99
          ]
        ],
        "points": 1.14
      },
      {
        "level": 4,
        "ranges": [
          [
            1,
            1
          ]
        ],
        "points": 1.5
      }
    ]
  },
  "ET6": {
    "code": "ET6",
    "name_es": "Identificación riesgos materiales",
    "name_va": "Identificació riscos materials",
    "name_en": "Material risk identification",
    "dimension": "etico",
    "max_points": 2.5,
    "max_level": 1,
    "formula_es": "Variable dicotómica (Sí=1 / No=0)",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "points": 2.5
      }
    ]
  },
  "ET8": {
    "code": "ET8",
    "name_es": "Mitigación riesgos materiales",
    "name_va": "Mitigació riscos materials",
    "name_en": "Material risk mitigation",
    "dimension": "etico",
    "max_points": 2.5,
    "max_level": 1,
    "formula_es": "Variable dicotómica (Sí=1 / No=0)",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "points": 2.5
      }
    ]
  },
  "ET19": {
    "code": "ET19",
    "name_es": "Plazo medio pago proveedores",
    "name_va": "Termini mitjà pagament proveïdors",
    "name_en": "Average supplier payment term",
    "dimension": "etico",
    "max_points": 2,
    "max_level": 3,
    "formula_es": "(Saldo medio acreedores / Compras netas + servicios exteriores) × 365",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            60,
            9999
          ]
        ],
        "points": 0.67
      },
      {
        "level": 2,
        "ranges": [
          [
            30.01,
            59.99
          ]
        ],
        "points": 1.34
      },
      {
        "level": 3,
        "ranges": [
          [
            0,
            30
          ]
        ],
        "points": 2
      }
    ]
  },
  "ET20": {
    "code": "ET20",
    "name_es": "Dispone de web",
    "name_va": "Disposa de web",
    "name_en": "Has website",
    "dimension": "etico",
    "max_points": 1,
    "max_level": 2,
    "formula_es": "0=No web, 0.5=Web sin accesibilidad, 1=Web accesible",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "points": 0.5
      },
      {
        "level": 2,
        "points": 1
      }
    ]
  },
  "ET22": {
    "code": "ET22",
    "name_es": "Memoria anual actividades",
    "name_va": "Memòria anual activitats",
    "name_en": "Annual activity report",
    "dimension": "etico",
    "max_points": 1,
    "max_level": 1,
    "formula_es": "Variable dicotómica (Sí=1 / No=0)",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "points": 1
      }
    ]
  },
  "AM2": {
    "code": "AM2",
    "name_es": "Intensidad emisiones",
    "name_va": "Intensitat emissions",
    "name_en": "Emission intensity",
    "dimension": "ambiental",
    "max_points": 4,
    "max_level": 3,
    "formula_es": "(Emisiones totales × 1.000.000) / Ventas totales €",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            50,
            50
          ]
        ],
        "points": 1.33
      },
      {
        "level": 2,
        "ranges": [
          [
            10,
            49.99
          ]
        ],
        "points": 2.66
      },
      {
        "level": 3,
        "ranges": [
          [
            0,
            9.99
          ]
        ],
        "points": 4
      }
    ]
  },
  "AM5": {
    "code": "AM5",
    "name_es": "Residuos reciclados/reutilizados",
    "name_va": "Residus reciclats/reutilitzats",
    "name_en": "Recycled/reused waste",
    "dimension": "ambiental",
    "max_points": 3,
    "max_level": 4,
    "formula_es": "(Residuos reciclados + reutilizados) / Total residuos",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.2999
          ]
        ],
        "points": 0.75
      },
      {
        "level": 2,
        "ranges": [
          [
            0.3,
            0.59
          ]
        ],
        "points": 1.5
      },
      {
        "level": 3,
        "ranges": [
          [
            0.6,
            0.9
          ]
        ],
        "points": 2.25
      },
      {
        "level": 4,
        "ranges": [
          [
            0.9001,
            1
          ]
        ],
        "points": 3
      }
    ]
  },
  "AM8": {
    "code": "AM8",
    "name_es": "Intensidad consumo agua",
    "name_va": "Intensitat consum aigua",
    "name_en": "Water intensity",
    "dimension": "ambiental",
    "max_points": 3,
    "max_level": 4,
    "formula_es": "(Agua_t / Ventas_vol_t) / (Agua_t-1 / Ventas_vol_t-1)",
    "levels": [
      {
        "level": 0,
        "points": 0,
        "desc_es": "No reporta o ratio > 1"
      },
      {
        "level": 1,
        "ranges": [
          [
            1,
            1
          ]
        ],
        "points": 0.75
      },
      {
        "level": 2,
        "ranges": [
          [
            0.975,
            0.999
          ]
        ],
        "points": 1.5
      },
      {
        "level": 3,
        "ranges": [
          [
            0.95,
            0.974
          ]
        ],
        "points": 2.25
      },
      {
        "level": 4,
        "ranges": [
          [
            0,
            0.9499
          ]
        ],
        "points": 3
      }
    ]
  },
  "AM10": {
    "code": "AM10",
    "name_es": "Intensidad energética",
    "name_va": "Intensitat energètica",
    "name_en": "Energy intensity",
    "dimension": "ambiental",
    "max_points": 4,
    "max_level": 4,
    "formula_es": "(Energía_t / Ventas_vol_t) / (Energía_t-1 / Ventas_vol_t-1)",
    "levels": [
      {
        "level": 0,
        "points": 0,
        "desc_es": "No reporta o ratio > 1"
      },
      {
        "level": 1,
        "ranges": [
          [
            1,
            1
          ]
        ],
        "points": 1
      },
      {
        "level": 2,
        "ranges": [
          [
            0.975,
            0.999
          ]
        ],
        "points": 2
      },
      {
        "level": 3,
        "ranges": [
          [
            0.95,
            0.974
          ]
        ],
        "points": 3
      },
      {
        "level": 4,
        "ranges": [
          [
            0,
            0.9499
          ]
        ],
        "points": 4
      }
    ]
  },
  "AMN1": {
    "code": "AMN1",
    "name_es": "Reducción/compensación emisiones",
    "name_va": "Reducció/compensació emissions",
    "name_en": "Emission reduction/offset",
    "dimension": "ambiental",
    "max_points": 1,
    "max_level": 3,
    "formula_es": "(Emisiones compensadas_t + Reducción emisiones_t) / Emisiones totales_t-1",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.05
          ]
        ],
        "points": 0.33
      },
      {
        "level": 2,
        "ranges": [
          [
            0.06,
            0.15
          ]
        ],
        "points": 0.66
      },
      {
        "level": 3,
        "ranges": [
          [
            0.1501,
            999
          ]
        ],
        "points": 1
      }
    ]
  },
  "AMN3": {
    "code": "AMN3",
    "name_es": "Intensidad uso suelo",
    "name_va": "Intensitat ús sòl",
    "name_en": "Land use intensity",
    "dimension": "ambiental",
    "max_points": 2,
    "max_level": 4,
    "formula_es": "Suelo SON (m²) / Suelo sellado SS (m²)",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.0999
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.1,
            0.5
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.51,
            0.99
          ]
        ],
        "points": 1.5
      },
      {
        "level": 4,
        "ranges": [
          [
            1,
            9999
          ]
        ],
        "points": 2
      }
    ]
  },
  "AMN5": {
    "code": "AMN5",
    "name_es": "Uso eficiente materiales",
    "name_va": "Ús eficient materials",
    "name_en": "Efficient material use",
    "dimension": "ambiental",
    "max_points": 2,
    "max_level": 4,
    "formula_es": "(Regenerativas + Recicladas + Reutilizadas) / Total materias primas",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            0.2999
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.3,
            0.59
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.6,
            0.9
          ]
        ],
        "points": 1.5
      },
      {
        "level": 4,
        "ranges": [
          [
            0.9001,
            999
          ]
        ],
        "points": 2
      }
    ]
  },
  "AMN7": {
    "code": "AMN7",
    "name_es": "Gestión recursos hídricos",
    "name_va": "Gestió recursos hídrics",
    "name_en": "Water resource management",
    "dimension": "ambiental",
    "max_points": 2,
    "max_level": 4,
    "formula_es": "Vertido agua (litros) / Consumo agua (litros)",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0.8001,
            999
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            0.5,
            0.79
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            0.2,
            0.49
          ]
        ],
        "points": 1.5
      },
      {
        "level": 4,
        "ranges": [
          [
            0,
            0.1999
          ]
        ],
        "points": 2
      }
    ]
  },
  "ID3": {
    "code": "ID3",
    "name_es": "Rentabilidad I (ROE)",
    "name_va": "Rendibilitat I (ROE)",
    "name_en": "Profitability I (ROE)",
    "dimension": "economico",
    "max_points": 2,
    "max_level": 4,
    "formula_es": "(Beneficio después impuestos / Patrimonio neto) × 100",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            5
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            5.01,
            7
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            7.01,
            10
          ]
        ],
        "points": 1.5
      },
      {
        "level": 4,
        "ranges": [
          [
            10.01,
            9999
          ]
        ],
        "points": 2
      }
    ]
  },
  "ID4": {
    "code": "ID4",
    "name_es": "Rentabilidad II (ROA)",
    "name_va": "Rendibilitat II (ROA)",
    "name_en": "Profitability II (ROA)",
    "dimension": "economico",
    "max_points": 2,
    "max_level": 4,
    "formula_es": "(BAII / Activo total) × 100",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            5
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            5.01,
            7
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            7.01,
            10
          ]
        ],
        "points": 1.5
      },
      {
        "level": 4,
        "ranges": [
          [
            10.01,
            9999
          ]
        ],
        "points": 2
      }
    ]
  },
  "ID5": {
    "code": "ID5",
    "name_es": "Endeudamiento",
    "name_va": "Endeutament",
    "name_en": "Leverage ratio",
    "dimension": "economico",
    "max_points": 2,
    "max_level": 3,
    "formula_es": "Pasivo exigible / Patrimonio neto",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "condition": "<0.30 o >0.70",
        "points": 0.67
      },
      {
        "level": 2,
        "ranges": [
          [
            0.3,
            0.39
          ],
          [
            0.61,
            0.7
          ]
        ],
        "points": 1.34
      },
      {
        "level": 3,
        "ranges": [
          [
            0.4,
            0.6
          ]
        ],
        "points": 2
      }
    ]
  },
  "ID6": {
    "code": "ID6",
    "name_es": "Productividad",
    "name_va": "Productivitat",
    "name_en": "Productivity",
    "dimension": "economico",
    "max_points": 2,
    "max_level": 4,
    "formula_es": "BAII / Nº medio personas ETC",
    "levels": [
      {
        "level": 0,
        "points": 0
      },
      {
        "level": 1,
        "ranges": [
          [
            0,
            6999.99
          ]
        ],
        "points": 0.5
      },
      {
        "level": 2,
        "ranges": [
          [
            7000,
            9999.99
          ]
        ],
        "points": 1
      },
      {
        "level": 3,
        "ranges": [
          [
            10000,
            15000
          ]
        ],
        "points": 1.5
      },
      {
        "level": 4,
        "ranges": [
          [
            15000.01,
            999999
          ]
        ],
        "points": 2
      }
    ]
  }
};

var THRESHOLDS = {
  "social": {
    "max": 19.5,
    "min": 9,
    "min_pct": 46
  },
  "etico": {
    "max": 9,
    "min": 4,
    "min_pct": 44
  },
  "ambiental": {
    "max": 21,
    "min": 9,
    "min_pct": 43
  },
  "economico": {
    "max": 8,
    "min": 3,
    "min_pct": 38
  },
  "total": {
    "max": 57.5,
    "min": 28,
    "min_pct": 49
  }
};

var ALL_STRINGS = {
  "es": {
    "plugin_title": "Autodiagnostico SIR",
    "plugin_subtitle": "Herramienta de apoyo para la autoevaluacion del Registro de Entidades Valencianas Socialmente Responsables",
    "microenterprise": "Microempresa (1-9 personas empleadas)",
    "step": "Paso",
    "of": "de",
    "next": "Siguiente",
    "prev": "Anterior",
    "calculate": "Calcular autoevaluacion",
    "calculating": "Calculando...",
    "recalculate": "Recalcular",
    "export": "Descargar informe",
    "save_progress": "Guardar progreso",
    "progress_saved": "Progreso guardado. Tu codigo es:",
    "load_progress": "Recuperar datos",
    "enter_session": "Introduce tu codigo de sesion:",
    "required_field": "Campo obligatorio",
    "doc_needed": "Documentacion necesaria",
    "help": "Ayuda",
    "formula": "Formula",
    "result_pass": "APTA — Cumple puntuaciones minimas",
    "result_fail": "NO APTA — No alcanza puntuaciones minimas",
    "result_partial": "Revise las dimensiones en rojo para mejorar su puntuacion.",
    "dim_social": "Social y Laboral",
    "dim_etico": "Etico",
    "dim_ambiental": "Ambiental",
    "dim_economico": "Sostenibilidad Economica",
    "global_result": "Resultado Global",
    "dim_summary": "Resumen por Dimension",
    "indicator_detail": "Detalle de Indicadores",
    "dimension": "Dimension",
    "score": "Puntuacion",
    "minimum": "Minimo requerido",
    "status": "Estado",
    "code": "Codigo",
    "indicator": "Indicador",
    "ratio": "Ratio",
    "level": "Nivel",
    "points": "Puntos",
    "passes": "Cumple",
    "not_passes": "No cumple",
    "not_reported": "No reportado",
    "entity": "Entidad",
    "date": "Fecha",
    "type": "Tipo",
    "report_title": "Informe de Autoevaluacion SIR",
    "report_footer": "Este informe ha sido generado como herramienta de apoyo. No sustituye la autoevaluacion oficial.",
    "report_disclaimer": "Los datos introducidos son responsabilidad del usuario.",
    "official_link": "Web oficial del Registro SIR",
    "start_process": "Iniciar tramite telematico",
    "registry_link": "Registro Mercantil",
    "hubspot_title": "Necesitas ayuda con tu inscripcion?",
    "hubspot_desc": "Dejanos tus datos y un especialista te contactara para guiarte en el proceso.",
    "hubspot_email": "Email",
    "hubspot_name": "Nombre",
    "hubspot_lastname": "Apellidos",
    "hubspot_phone": "Telefono",
    "hubspot_company": "Empresa",
    "hubspot_submit": "Solicitar asesoramiento",
    "hubspot_success": "Gracias! Nos pondremos en contacto contigo pronto.",
    "hubspot_consent": "Acepto que mis datos sean tratados para recibir informacion sobre el proceso SIR.",
    "lang_es": "ES",
    "lang_va": "VAL",
    "lang_en": "EN",
    "computed_auto": "Calculado automaticamente",
    "risk_report": "Si no alcanza los minimos, consulte el informe de posicion de riesgo del Registro Mercantil",
    "etc_label": "Personas empleadas equivalentes a tiempo completo (ETC)",
    "smi_note": "El SMI anual se aplica automaticamente segun la configuracion del plugin.",
    "connection_error": "Error de conexion.",
    "calculation_error": "Error al calcular. Intentelo de nuevo."
  },
  "va": {
    "plugin_title": "Autodiagnostic SIR",
    "plugin_subtitle": "Ferramenta de suport per a l'autoavaluacio del Registre d'Entitats Valencianes Socialment Responsables",
    "microenterprise": "Microempresa (1-9 persones empleades)",
    "step": "Pas",
    "of": "de",
    "next": "Seguent",
    "prev": "Anterior",
    "calculate": "Calcular autoavaluacio",
    "calculating": "Calculant...",
    "recalculate": "Recalcular",
    "export": "Descarregar informe",
    "save_progress": "Guardar progres",
    "progress_saved": "Progres guardat. El teu codi es:",
    "load_progress": "Recuperar dades",
    "enter_session": "Introdueix el teu codi de sessio:",
    "required_field": "Camp obligatori",
    "doc_needed": "Documentacio necessaria",
    "help": "Ajuda",
    "formula": "Formula",
    "result_pass": "APTA — Compleix puntuacions minimes",
    "result_fail": "NO APTA — No arriba a les puntuacions minimes",
    "result_partial": "Reviseu les dimensions en roig per a millorar la puntuacio.",
    "dim_social": "Social i Laboral",
    "dim_etico": "Etic",
    "dim_ambiental": "Ambiental",
    "dim_economico": "Sostenibilitat Economica",
    "global_result": "Resultat Global",
    "dim_summary": "Resum per Dimensio",
    "indicator_detail": "Detall d'Indicadors",
    "dimension": "Dimensio",
    "score": "Puntuacio",
    "minimum": "Minim requerit",
    "status": "Estat",
    "code": "Codi",
    "indicator": "Indicador",
    "ratio": "Ratio",
    "level": "Nivell",
    "points": "Punts",
    "passes": "Compleix",
    "not_passes": "No compleix",
    "not_reported": "No reportat",
    "entity": "Entitat",
    "date": "Data",
    "type": "Tipus",
    "report_title": "Informe d'Autoavaluacio SIR",
    "report_footer": "Este informe ha sigut generat com a ferramenta de suport. No substitueix l'autoavaluacio oficial.",
    "report_disclaimer": "Les dades introduides son responsabilitat de l'usuari.",
    "official_link": "Web oficial del Registre SIR",
    "start_process": "Iniciar tramit telematic",
    "registry_link": "Registre Mercantil",
    "hubspot_title": "Necessites ajuda amb la teua inscripcio?",
    "hubspot_desc": "Deixa'ns les teues dades i un especialista et contactara.",
    "hubspot_email": "Email",
    "hubspot_name": "Nom",
    "hubspot_lastname": "Cognoms",
    "hubspot_phone": "Telefon",
    "hubspot_company": "Empresa",
    "hubspot_submit": "Sol\\u00b7licitar assessorament",
    "hubspot_success": "Gracies! Ens posarem en contacte amb tu prompte.",
    "hubspot_consent": "Accepte que les meues dades siguen tractades per a rebre informacio sobre el proces SIR.",
    "lang_es": "ES",
    "lang_va": "VAL",
    "lang_en": "EN",
    "computed_auto": "Calculat automaticament",
    "risk_report": "Si no arriba als minims, consulteu l'informe de posicio de risc del Registre Mercantil",
    "etc_label": "Persones empleades equivalents a temps complet (ETC)",
    "smi_note": "L'SMI anual s'aplica automaticament segons la configuracio del plugin.",
    "connection_error": "Error de connexio.",
    "calculation_error": "Error al calcular. Intenteu-ho de nou."
  },
  "en": {
    "plugin_title": "SIR Self-Assessment",
    "plugin_subtitle": "Support tool for the Valencian Socially Responsible Entities Registry self-assessment",
    "microenterprise": "Micro-enterprise (1-9 employees)",
    "step": "Step",
    "of": "of",
    "next": "Next",
    "prev": "Previous",
    "calculate": "Calculate assessment",
    "calculating": "Calculating...",
    "recalculate": "Recalculate",
    "export": "Download report",
    "save_progress": "Save progress",
    "progress_saved": "Progress saved. Your code is:",
    "load_progress": "Load saved data",
    "enter_session": "Enter your session code:",
    "required_field": "Required field",
    "doc_needed": "Required documentation",
    "help": "Help",
    "formula": "Formula",
    "result_pass": "ELIGIBLE — Meets minimum scores",
    "result_fail": "NOT ELIGIBLE — Does not meet minimum scores",
    "result_partial": "Review the dimensions in red to improve your score.",
    "dim_social": "Social & Labour",
    "dim_etico": "Ethical",
    "dim_ambiental": "Environmental",
    "dim_economico": "Economic Sustainability",
    "global_result": "Global Result",
    "dim_summary": "Summary by Dimension",
    "indicator_detail": "Indicator Details",
    "dimension": "Dimension",
    "score": "Score",
    "minimum": "Minimum required",
    "status": "Status",
    "code": "Code",
    "indicator": "Indicator",
    "ratio": "Ratio",
    "level": "Level",
    "points": "Points",
    "passes": "Passes",
    "not_passes": "Does not pass",
    "not_reported": "Not reported",
    "entity": "Entity",
    "date": "Date",
    "type": "Type",
    "report_title": "SIR Self-Assessment Report",
    "report_footer": "This report was generated as a support tool. It does not replace the official self-assessment.",
    "report_disclaimer": "The data entered is the responsibility of the user.",
    "official_link": "Official SIR Registry website",
    "start_process": "Start online application",
    "registry_link": "Commercial Registry",
    "hubspot_title": "Need help with your registration?",
    "hubspot_desc": "Leave your details and a specialist will contact you.",
    "hubspot_email": "Email",
    "hubspot_name": "First name",
    "hubspot_lastname": "Last name",
    "hubspot_phone": "Phone",
    "hubspot_company": "Company",
    "hubspot_submit": "Request advisory",
    "hubspot_success": "Thank you! We will contact you soon.",
    "hubspot_consent": "I agree to my data being processed to receive information about the SIR process.",
    "lang_es": "ES",
    "lang_va": "VAL",
    "lang_en": "EN",
    "computed_auto": "Auto-calculated",
    "risk_report": "If minimum scores are not met, consult the risk position report from the Commercial Registry",
    "etc_label": "Full-time equivalent employees (FTE)",
    "smi_note": "The annual minimum wage is applied automatically based on plugin settings.",
    "connection_error": "Connection error.",
    "calculation_error": "Calculation error. Please try again."
  }
};

// ===================== CONSTANTS (ported from plugin settings defaults) =====================
var SMI_ANUAL = 15876;
var DIAS_LABORABLES = 249;

// ===================== CALCULATOR (ported 1:1 from class-sir-calculator.php) =====================
function v(data, key, def) {
  def = def === undefined ? 0 : def;
  var val = data[key];
  return (val !== undefined && val !== '' && !isNaN(parseFloat(val))) ? parseFloat(val) : def;
}
function s(data, key, def) {
  def = def === undefined ? '' : def;
  return data[key] !== undefined ? data[key] : def;
}

function calculateAll(data) {
  var dimensionScores = { social: 0, etico: 0, ambiental: 0, economico: 0 };
  var results = {};

  var b1 = v(data, 'B1');
  var b2 = v(data, 'B2');
  var avgEmployees = (b1 + b2) / 2;
  var b8 = v(data, 'B8');
  var b9 = v(data, 'B9');
  var jornada = 8;

  var etcT = (DIAS_LABORABLES > 0 && jornada > 0) ? b8 / (DIAS_LABORABLES * jornada) : 0;
  var etcT1 = (DIAS_LABORABLES > 0 && jornada > 0) ? b9 / (DIAS_LABORABLES * jornada) : 0;
  var avgEtc = (etcT + etcT1) / 2;

  var energyT = v(data, 'L3') + v(data, 'L5') + v(data, 'L7');
  var energyT1 = v(data, 'L4') + v(data, 'L6') + v(data, 'L8');

  var waterT = v(data, 'L11') + v(data, 'L12') + v(data, 'L13') - v(data, 'L14');
  var waterT1 = v(data, 'L16');

  var wasteRecycled = v(data, 'L24') + v(data, 'L25') + v(data, 'L26') + v(data, 'L27');
  var wasteDisposal = v(data, 'L28') + v(data, 'L29');
  var wasteTotal = wasteRecycled + wasteDisposal;

  Object.keys(INDICATORS).forEach(function(code) {
    var ind = INDICATORS[code];
    var ratio = null;
    var reported = true;

    switch (code) {
      case 'SL3': {
        var f1 = v(data, 'F1'), f2 = v(data, 'F2');
        if (f2 > 0 && f1 > 0) { ratio = f1 / f2; } else { reported = false; }
        break;
      }
      case 'SL5': {
        var c1 = v(data, 'C1'), c2 = v(data, 'C2');
        if (c1 > 0) { ratio = c2 / c1; } else { reported = false; }
        break;
      }
      case 'SL10': {
        var d1 = v(data, 'D1'), d2 = v(data, 'D2');
        var b3 = v(data, 'B3'), b4 = v(data, 'B4');
        var avgWomen = (b3 + b4) / 2;
        if (avgEmployees > 0 && avgWomen > 0) {
          var rotTotal = d1 / avgEmployees;
          var rotWomen = (avgWomen > 0) ? d2 / avgWomen : 0;
          ratio = (rotTotal > 0) ? rotWomen / rotTotal : null;
          if (ratio === null) reported = false;
        } else { reported = false; }
        break;
      }
      case 'SL11': {
        var n1 = v(data, 'N1'), n2 = v(data, 'N2');
        if (n1 > 0) { ratio = n2 / n1; } else { reported = false; }
        break;
      }
      case 'SL14':
        if (b1 > 0) { ratio = v(data, 'B5') / b1; } else { reported = false; }
        break;
      case 'SL15':
        if (b1 > 0) { ratio = v(data, 'B6') / b1; } else { reported = false; }
        break;
      case 'SL17':
        if (b1 > 0) { ratio = v(data, 'B7') / b1; } else { reported = false; }
        break;
      case 'SL18': {
        var f3a = v(data, 'F3');
        if (f3a > 0 && SMI_ANUAL > 0) { ratio = f3a / SMI_ANUAL; } else { reported = false; }
        break;
      }
      case 'SL19': {
        var f3b = v(data, 'F3'), f5 = v(data, 'F5');
        if (f3b > 0 && f5 > 0) { ratio = f5 / f3b; } else { reported = false; }
        break;
      }
      case 'SL22':
        if (avgEmployees > 0) { ratio = v(data, 'D1') / avgEmployees; } else { reported = false; }
        break;
      case 'SL26':
        if (avgEmployees > 0) { ratio = (v(data, 'D3') / avgEmployees) * 1000; } else { reported = false; }
        break;
      case 'SL27': {
        var d5 = v(data, 'D5');
        if (d5 > 0) { ratio = (v(data, 'D4') / d5) * 1000000; } else { reported = false; }
        break;
      }
      case 'SL35': {
        var d7 = v(data, 'D7');
        if (d7 > 0) { ratio = v(data, 'D6') / d7; } else { reported = false; }
        break;
      }
      case 'SL36': {
        var d9 = v(data, 'D9');
        if (d9 > 0) { ratio = v(data, 'D8') / d9; } else { reported = false; }
        break;
      }

      // ETICOS
      case 'ET6':
        ratio = (s(data, 'H1') === 'si') ? 1 : 0;
        reported = (s(data, 'H1') !== '');
        break;
      case 'ET8':
        ratio = (s(data, 'H2') === 'si') ? 1 : 0;
        reported = (s(data, 'H2') !== '');
        break;
      case 'ET19': {
        var j3 = v(data, 'J3'), j4 = v(data, 'J4');
        if (j4 > 0) { ratio = (j3 / j4) * 365; } else { reported = false; }
        break;
      }
      case 'ET20': {
        var h3 = s(data, 'H3');
        if (h3 === 'si_acc') { ratio = 1; }
        else if (h3 === 'si') { ratio = 0.5; }
        else { ratio = 0; reported = (h3 !== ''); }
        break;
      }
      case 'ET22':
        ratio = (s(data, 'H4') === 'si') ? 1 : 0;
        reported = (s(data, 'H4') !== '');
        break;

      // AMBIENTALES
      case 'AM2': {
        var l1a = v(data, 'L1'), j5a = v(data, 'J5');
        if (j5a > 0 && l1a >= 0) { ratio = (l1a * 1000000) / j5a; } else { reported = false; }
        break;
      }
      case 'AM5':
        if (wasteTotal > 0) { ratio = wasteRecycled / wasteTotal; } else { reported = false; }
        break;
      case 'AM8': {
        var j6a = v(data, 'J6'), j9a = v(data, 'J9');
        if (j6a > 0 && j9a > 0 && waterT1 > 0) {
          var intT = waterT / j6a;
          var intT1 = waterT1 / j9a;
          ratio = (intT1 > 0) ? intT / intT1 : null;
          if (ratio === null || ratio > 1) { reported = (ratio !== null); }
        } else { reported = false; }
        break;
      }
      case 'AM10': {
        var j6b = v(data, 'J6'), j9b = v(data, 'J9');
        if (j6b > 0 && j9b > 0 && energyT1 > 0) {
          var intT2 = energyT / j6b;
          var intT1b = energyT1 / j9b;
          ratio = (intT1b > 0) ? intT2 / intT1b : null;
          if (ratio === null || ratio > 1) { reported = (ratio !== null); }
        } else { reported = false; }
        break;
      }
      case 'AMN1': {
        var l2 = v(data, 'L2'), l1b = v(data, 'L1'), l17 = v(data, 'L17');
        if (l2 > 0) {
          var reduction = Math.max(0, l2 - l1b);
          ratio = (l17 + reduction) / l2;
        } else { reported = false; }
        break;
      }
      case 'AMN3': {
        var l18 = v(data, 'L18'), l19 = v(data, 'L19');
        if (l19 > 0) { ratio = l18 / l19; } else { reported = false; }
        break;
      }
      case 'AMN5': {
        var l23 = v(data, 'L23');
        if (l23 > 0) { ratio = (v(data, 'L20') + v(data, 'L21') + v(data, 'L22')) / l23; } else { reported = false; }
        break;
      }
      case 'AMN7':
        if (waterT > 0) { ratio = v(data, 'L14') / waterT; } else { reported = false; }
        break;

      // ECONOMICOS
      case 'ID3': {
        var k1a = v(data, 'K1');
        if (k1a > 0) { ratio = (v(data, 'J1') / k1a) * 100; } else { reported = false; }
        break;
      }
      case 'ID4': {
        var k2 = v(data, 'K2');
        if (k2 > 0) { ratio = (v(data, 'J2') / k2) * 100; } else { reported = false; }
        break;
      }
      case 'ID5': {
        var k1b = v(data, 'K1'), k3 = v(data, 'K3');
        if (k1b > 0) { ratio = k3 / k1b; } else { reported = false; }
        break;
      }
      case 'ID6':
        if (avgEtc > 0) { ratio = v(data, 'J2') / avgEtc; } else { reported = false; }
        break;
    }

    var level = 0;
    var points = 0;
    if (reported && ratio !== null) {
      level = determineLevel(code, ratio, ind);
      points = getPointsForLevel(ind, level);
    }

    results[code] = {
      code: code,
      name: ind.name_es,
      dimension: ind.dimension,
      ratio: ratio,
      reported: reported,
      level: level,
      max_level: ind.max_level,
      points: Math.round(points * 100) / 100,
      max_points: ind.max_points,
    };

    dimensionScores[ind.dimension] += points;
  });

  Object.keys(dimensionScores).forEach(function(dim) {
    dimensionScores[dim] = Math.round(dimensionScores[dim] * 100) / 100;
  });

  var totalScore = Math.round(Object.keys(dimensionScores).reduce(function(a, k) { return a + dimensionScores[k]; }, 0) * 100) / 100;

  var passes = true;
  var dimensionStatus = {};
  Object.keys(THRESHOLDS).forEach(function(dim) {
    var th = THRESHOLDS[dim];
    if (dim === 'total') {
      dimensionStatus.total = {
        score: totalScore, max: th.max, min: th.min,
        passes: totalScore >= th.min,
        pct: Math.round((totalScore / th.max) * 1000) / 10,
      };
      if (totalScore < th.min) passes = false;
    } else {
      var score = dimensionScores[dim];
      dimensionStatus[dim] = {
        score: score, max: th.max, min: th.min,
        passes: score >= th.min,
        pct: Math.round((score / th.max) * 1000) / 10,
      };
      if (score < th.min) passes = false;
    }
  });

  return {
    indicators: results,
    dimensions: dimensionStatus,
    total_score: totalScore,
    passes: passes,
    etc_t: Math.round(etcT * 100) / 100,
    etc_t1: Math.round(etcT1 * 100) / 100,
    avg_etc: Math.round(avgEtc * 100) / 100,
    energy_t: energyT,
    energy_t1: energyT1,
    water_t: waterT,
  };
}

function determineLevel(code, ratio, ind) {
  if (code === 'ET6' || code === 'ET8' || code === 'ET22') {
    return (ratio >= 1) ? 1 : 0;
  }
  if (code === 'ET20') {
    if (ratio >= 1) return 2;
    if (ratio >= 0.5) return 1;
    return 0;
  }
  if (code === 'SL3' && (ratio < 0.70 || ratio > 1.30)) return 0;
  if (code === 'SL27' && ratio === 0) return 4;
  if ((code === 'AM8' || code === 'AM10') && ratio > 1) return 0;

  if (code === 'ID5') {
    if (ratio >= 0.40 && ratio <= 0.60) return 3;
    if ((ratio >= 0.30 && ratio <= 0.39) || (ratio >= 0.61 && ratio <= 0.70)) return 2;
    return 1;
  }

  if (code === 'SL10') {
    if (ratio >= 0.95 && ratio <= 1.05) return 3;
    if ((ratio >= 0.85 && ratio <= 0.94) || (ratio >= 1.06 && ratio <= 1.15)) return 2;
    return 1;
  }

  var levels = ind.levels;
  for (var i = levels.length - 1; i >= 0; i--) {
    var lv = levels[i];
    if (!lv.ranges) continue;
    for (var j = 0; j < lv.ranges.length; j++) {
      var range = lv.ranges[j];
      if (ratio >= range[0] && ratio <= range[1]) {
        return lv.level;
      }
    }
  }

  return (levels[1] !== undefined) ? 1 : 0;
}

function getPointsForLevel(ind, level) {
  for (var i = 0; i < ind.levels.length; i++) {
    if (ind.levels[i].level === level) return ind.levels[i].points;
  }
  return 0;
}

// ===================== EXPORT / REPORT (ported 1:1 from class-sir-export.php) =====================
function xEsc(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateReportHtml(data, results, lang) {
  var t = ALL_STRINGS[lang] || ALL_STRINGS.es;
  var thresholds = THRESHOLDS;
  var dims = results.dimensions || {};
  var indicators = results.indicators || {};
  var passes = results.passes || false;
  var total = results.total_score || 0;
  var entity = xEsc(data.A1 || '');
  var nif = xEsc(data.A2 || '');
  var date = new Date().toLocaleDateString('es-ES');

  var passLabel = passes ? (t.result_pass || 'APTA') : (t.result_fail || 'NO APTA');
  var passColor = passes ? '#2D6A4F' : '#C62828';

  var dimNames = {
    social: t.dim_social || 'Social y Laboral',
    etico: t.dim_etico || 'Etico',
    ambiental: t.dim_ambiental || 'Ambiental',
    economico: t.dim_economico || 'Economico',
  };

  var rows = '';
  Object.keys(indicators).forEach(function(code) {
    var ind = indicators[code];
    var dimLabel = dimNames[ind.dimension] || ind.dimension;
    var ratioDisplay = (ind.ratio !== null) ? ind.ratio.toFixed(4) : '—';
    var levelDisplay = ind.level + '/' + ind.max_level;
    var pointsDisplay = ind.points.toFixed(2) + '/' + ind.max_points.toFixed(1);
    var barPct = (ind.max_points > 0) ? Math.round((ind.points / ind.max_points) * 100) : 0;
    var barColor = (barPct >= 60) ? '#2D6A4F' : ((barPct >= 30) ? '#F9A825' : '#C62828');

    rows += '<tr>' +
      '<td style="font-weight:600;">' + xEsc(ind.code) + '</td>' +
      '<td>' + xEsc(ind.name) + '</td>' +
      '<td style="text-align:center;">' + xEsc(dimLabel) + '</td>' +
      '<td style="text-align:right;font-family:monospace;">' + ratioDisplay + '</td>' +
      '<td style="text-align:center;">' + levelDisplay + '</td>' +
      '<td style="text-align:center;">' +
        '<div style="background:#eee;border-radius:4px;overflow:hidden;height:18px;position:relative;">' +
          '<div style="background:' + barColor + ';height:100%;width:' + barPct + '%;"></div>' +
          '<span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:11px;font-weight:600;">' + pointsDisplay + '</span>' +
        '</div>' +
      '</td>' +
    '</tr>';
  });

  var dimSummary = '';
  ['social', 'etico', 'ambiental', 'economico'].forEach(function(dim) {
    var d = dims[dim];
    if (!d) return;
    var statusIcon = d.passes ? 'OK' : 'X';
    dimSummary += '<tr>' +
      '<td style="font-weight:600;">' + xEsc(dimNames[dim]) + '</td>' +
      '<td style="text-align:center;">' + d.score + '/' + d.max + '</td>' +
      '<td style="text-align:center;">' + d.min + '</td>' +
      '<td style="text-align:center;">' + d.pct + '%</td>' +
      '<td style="text-align:center;font-size:18px;">' + statusIcon + '</td>' +
    '</tr>';
  });
  var totalD = dims.total || {};
  var totalIcon = (totalD.passes) ? 'OK' : 'X';
  dimSummary += '<tr style="font-weight:700;background:#f5f5f5;">' +
    '<td>TOTAL</td>' +
    '<td style="text-align:center;">' + total + '/' + thresholds.total.max + '</td>' +
    '<td style="text-align:center;">' + thresholds.total.min + '</td>' +
    '<td style="text-align:center;">' + (totalD.pct || 0) + '%</td>' +
    '<td style="text-align:center;font-size:18px;">' + totalIcon + '</td>' +
  '</tr>';

  var html = '<!DOCTYPE html><html lang="' + lang + '">' +
'<head><meta charset="UTF-8"><title>' + xEsc(t.report_title || 'Informe Autoevaluacion SIR') + '</title>' +
'<style>' +
'body{font-family:"Segoe UI",system-ui,sans-serif;margin:40px;color:#1a1a1a;line-height:1.5;}' +
'h1{color:#2D6A4F;border-bottom:3px solid #2D6A4F;padding-bottom:10px;}' +
'h2{color:#1B4332;margin-top:30px;}' +
'table{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px;}' +
'th,td{border:1px solid #ddd;padding:8px 10px;}' +
'th{background:#2D6A4F;color:white;text-align:left;}' +
'.header-info{display:flex;justify-content:space-between;margin-bottom:20px;}' +
'.result-badge{display:inline-block;padding:12px 24px;border-radius:8px;color:white;font-size:24px;font-weight:700;}' +
'.footer{margin-top:40px;padding-top:20px;border-top:1px solid #ddd;font-size:11px;color:#666;}' +
'@media print{body{margin:20px;} table{page-break-inside:auto;} tr{page-break-inside:avoid;}}' +
'</style></head><body>' +
'<h1>' + xEsc(t.report_title || 'Informe de Autoevaluacion SIR') + '</h1>' +
'<div class="header-info">' +
  '<div><strong>' + xEsc(t.entity || 'Entidad') + ':</strong> ' + entity + '<br><strong>NIF:</strong> ' + nif + '<br><strong>' + xEsc(t.date || 'Fecha') + ':</strong> ' + date + '</div>' +
  '<div style="text-align:right;"><strong>' + xEsc(t.type || 'Tipo') + ':</strong> ' + xEsc(t.microenterprise || 'Microempresa (1-9)') + '<br><strong>ETC:</strong> ' + (results.avg_etc != null ? results.avg_etc : '—') + '</div>' +
'</div>' +
'<h2>' + xEsc(t.global_result || 'Resultado Global') + '</h2>' +
'<div style="text-align:center;margin:20px 0;">' +
  '<div class="result-badge" style="background:' + passColor + ';">' + xEsc(passLabel) + '</div>' +
  '<p style="font-size:20px;margin-top:10px;"><strong>' + total + ' / ' + thresholds.total.max + '</strong> ' + xEsc(t.points || 'puntos') + ' (' + (totalD.pct || 0) + '%)</p>' +
'</div>' +
'<h2>' + xEsc(t.dim_summary || 'Resumen por Dimension') + '</h2>' +
'<table><thead><tr><th>' + xEsc(t.dimension || 'Dimension') + '</th><th style="text-align:center;">' + xEsc(t.score || 'Puntuacion') + '</th><th style="text-align:center;">' + xEsc(t.minimum || 'Minimo') + '</th><th style="text-align:center;">%</th><th style="text-align:center;">' + xEsc(t.status || 'Estado') + '</th></tr></thead>' +
'<tbody>' + dimSummary + '</tbody></table>' +
'<h2>' + xEsc(t.indicator_detail || 'Detalle de Indicadores') + '</h2>' +
'<table><thead><tr><th>' + xEsc(t.code || 'Codigo') + '</th><th>' + xEsc(t.indicator || 'Indicador') + '</th><th style="text-align:center;">' + xEsc(t.dimension || 'Dim.') + '</th><th style="text-align:right;">' + xEsc(t.ratio || 'Ratio') + '</th><th style="text-align:center;">' + xEsc(t.level || 'Nivel') + '</th><th style="text-align:center;">' + xEsc(t.points || 'Puntos') + '</th></tr></thead>' +
'<tbody>' + rows + '</tbody></table>' +
'<div class="footer">' +
  '<p>' + xEsc(t.report_footer || 'Este informe ha sido generado automaticamente como herramienta de apoyo para la autoevaluacion SIR.') + '</p>' +
  '<p>' + xEsc(t.report_disclaimer || 'Los datos introducidos son responsabilidad del usuario. Este informe no sustituye la autoevaluacion oficial.') + '</p>' +
  '<p><a href="https://hisenda.gva.es/es/web/economia/registre-entitats-valencianes-socialment-responsables">' + xEsc(t.official_link || 'Web oficial del Registro SIR') + '</a> | <a href="https://sede.gva.es/es/detall-tramit?id_proc=22976">' + xEsc(t.start_process || 'Iniciar tramite telematico') + '</a></p>' +
'</div>' +
'</body></html>';

  return html;
}

// ===================== APP STATE =====================
var sectionKeys = Object.keys(SECTIONS);
var totalSteps = sectionKeys.length;
var currentStep = 0;
var lang = 'es';
var formData = {};
var lastResults = null;

var STORAGE_KEY = 'sir_autodiagnostico_progress';

function loadSavedProgress() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) formData = JSON.parse(raw) || {};
  } catch (e) { formData = {}; }
}

function persistProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); } catch (e) {}
}

function t(key) { return (ALL_STRINGS[lang] && ALL_STRINGS[lang][key]) || key; }
function tField(field, prop) {
  return field[prop + '_' + lang] || field[prop + '_es'] || '';
}

function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

// ===================== INIT / LANG =====================
function initLang() {
  var urlParams = new URLSearchParams(window.location.search);
  var urlLang = urlParams.get('sir_lang');
  if (urlLang && ALL_STRINGS[urlLang]) lang = urlLang;

  var forced = $wrap.getAttribute('data-lang');
  if (forced && ALL_STRINGS[forced]) lang = forced;

  $all('.sir-lang-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.lang === lang); });
}

function switchLang(newLang) {
  if (!ALL_STRINGS[newLang]) return;
  lang = newLang;
  $all('.sir-lang-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.lang === lang); });

  applyI18n();
  renderProgressSteps();
  renderCurrentSection();
  updateNav();

  if (lastResults && $('#sir-results').style.display !== 'none') {
    showResults(lastResults);
  }
}

function applyI18n() {
  $all('[data-i18n]').forEach(function(el) {
    var key = el.dataset.i18n;
    if (t(key) !== key) el.textContent = t(key);
  });
  $all('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.dataset.i18nPlaceholder;
    if (t(key) !== key) el.setAttribute('placeholder', t(key));
  });
}

// ===================== PROGRESS BAR =====================
function renderProgressSteps() {
  var stepsEl = $('#sir-progress-steps');
  stepsEl.innerHTML = '';
  sectionKeys.forEach(function(key, i) {
    var sec = SECTIONS[key];
    var label = sec['title_' + lang] || sec.title_es || key;
    var div = document.createElement('div');
    div.className = 'sir-step' + (i === 0 ? ' active' : '');
    div.dataset.step = i;
    div.title = label;
    div.innerHTML = '<span class="sir-step-num">' + (i + 1) + '</span>';
    div.addEventListener('click', function() {
      currentStep = i;
      renderCurrentSection();
      updateNav();
      updateProgressBar();
    });
    stepsEl.appendChild(div);
  });
  updateProgressBar();
}

function updateProgressBar() {
  var pct = ((currentStep + 1) / totalSteps) * 100;
  $('#sir-progress-bar').style.width = pct + '%';
  $all('.sir-step').forEach(function(el, i) {
    el.classList.remove('active', 'completed');
    if (i < currentStep) el.classList.add('completed');
    if (i === currentStep) el.classList.add('active');
  });
}

// ===================== FORM RENDERING =====================
function renderCurrentSection() {
  var key = sectionKeys[currentStep];
  var sec = SECTIONS[key];
  if (!sec) return;

  var area = $('#sir-form-area');
  var title = sec['title_' + lang] || sec.title_es;
  var doc = sec['doc_' + lang] || sec.doc_es || '';
  var dimColors = { social: 'var(--sir-social)', etico: 'var(--sir-etico)', ambiental: 'var(--sir-ambiental)', economico: 'var(--sir-economico)', info: 'var(--sir-text-muted)' };
  var dimColor = dimColors[sec.dimension] || 'var(--sir-text-muted)';
  var dimLabel = sec.dimension ? t('dim_' + sec.dimension) : '';

  var html = '<div class="sir-section" data-section="' + key + '">' +
    '<div class="sir-section-header" style="border-left-color:' + dimColor + ';">' +
      '<div class="sir-section-step">' + t('step') + ' ' + (currentStep + 1) + ' ' + t('of') + ' ' + totalSteps + '</div>' +
      '<h3 class="sir-section-title">' + title + '</h3>' +
      (dimLabel ? '<span class="sir-dim-badge" style="background:' + dimColor + ';">' + dimLabel + '</span>' : '') +
    '</div>';

  if (doc) {
    html += '<div class="sir-doc-box"><strong>' + t('doc_needed') + ':</strong><p>' + doc + '</p></div>';
  }

  html += '<div class="sir-fields">';

  sec.fields.forEach(function(field) {
    var label = tField(field, 'label');
    var help = tField(field, 'help');
    var val = formData[field.id] || '';
    var req = field.required ? '<span class="sir-req">*</span>' : '';
    var computedTag = field.computed ? '<span class="sir-computed">' + t('computed_auto') + '</span>' : '';
    var indicatorTags = (field.indicator || []).map(function(c) { return '<span class="sir-indicator-tag">' + c + '</span>'; }).join('');

    html += '<div class="sir-field ' + (field.computed ? 'sir-field-computed' : '') + '" data-field="' + field.id + '">' +
      '<label for="sir-' + field.id + '">' + label + ' ' + req + ' ' + computedTag + '</label>';

    if (help) html += '<div class="sir-help">' + help + '</div>';

    if (field.type === 'select') {
      var opts = field['options_' + lang] || field.options_es || field.options || [];
      html += '<select id="sir-' + field.id + '" class="sir-input sir-select" data-field="' + field.id + '" ' + (field.required ? 'required' : '') + '>';
      if (Array.isArray(opts)) {
        opts.forEach(function(o) { html += '<option value="' + xEsc(o) + '" ' + (val === o ? 'selected' : '') + '>' + xEsc(o) + '</option>'; });
      } else {
        Object.keys(opts).forEach(function(k) { html += '<option value="' + xEsc(k) + '" ' + (val === k ? 'selected' : '') + '>' + xEsc(opts[k]) + '</option>'; });
      }
      html += '</select>';
    } else if (field.type === 'textarea') {
      html += '<textarea id="sir-' + field.id + '" class="sir-input sir-textarea" data-field="' + field.id + '" rows="3">' + xEsc(val) + '</textarea>';
    } else {
      var step = field.step || (field.type === 'number' ? '0.01' : '');
      html += '<input type="' + field.type + '" id="sir-' + field.id + '" class="sir-input" data-field="' + field.id + '" value="' + xEsc(val) + '" ' + (step ? 'step="' + step + '"' : '') + ' ' + (field.required ? 'required' : '') + ' ' + (field.computed ? 'readonly' : '') + ' />';
    }

    if (indicatorTags) html += '<div class="sir-indicator-tags">' + indicatorTags + '</div>';
    html += '</div>';
  });

  html += '</div></div>';
  area.innerHTML = html;

  $all('.sir-input, .sir-select, .sir-textarea', area).forEach(function(el) {
    ['change', 'input'].forEach(function(evt) {
      el.addEventListener(evt, function() {
        formData[el.dataset.field] = el.value;
        computeAutoFields();
        persistProgress();
      });
    });
  });
}

// ===================== AUTO-COMPUTED FIELDS =====================
function computeAutoFields() {
  var l9 = (parseFloat(formData.L3) || 0) + (parseFloat(formData.L5) || 0) + (parseFloat(formData.L7) || 0);
  formData.L9 = l9;
  var l9el = $('#sir-L9'); if (l9el) l9el.value = l9 || '';

  var l10 = (parseFloat(formData.L4) || 0) + (parseFloat(formData.L6) || 0) + (parseFloat(formData.L8) || 0);
  formData.L10 = l10;
  var l10el = $('#sir-L10'); if (l10el) l10el.value = l10 || '';

  var l15 = (parseFloat(formData.L11) || 0) + (parseFloat(formData.L12) || 0) + (parseFloat(formData.L13) || 0) - (parseFloat(formData.L14) || 0);
  formData.L15 = Math.max(0, l15);
  var l15el = $('#sir-L15'); if (l15el) l15el.value = formData.L15 || '';
}

// ===================== NAVIGATION =====================
function updateNav() {
  var prevBtn = $('#sir-btn-prev');
  prevBtn.disabled = currentStep === 0;
  prevBtn.textContent = t('prev');
  var isLast = currentStep === totalSteps - 1;
  var nextBtn = $('#sir-btn-next');
  nextBtn.textContent = isLast ? t('calculate') : t('next');
  nextBtn.classList.toggle('sir-btn-calculate', isLast);
  $('#sir-btn-save').textContent = t('save_progress');
}

function goNext() {
  if (currentStep < totalSteps - 1) {
    currentStep++;
    renderCurrentSection();
    updateNav();
    updateProgressBar();
    window.scrollTo({ top: $wrap.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  } else {
    doCalculate();
  }
}

function goPrev() {
  if (currentStep > 0) {
    currentStep--;
    renderCurrentSection();
    updateNav();
    updateProgressBar();
    window.scrollTo({ top: $wrap.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  }
}

// ===================== CALCULATE =====================
function doCalculate() {
  var nextBtn = $('#sir-btn-next');
  nextBtn.disabled = true;
  nextBtn.textContent = t('calculating');

  setTimeout(function() {
    try {
      lastResults = calculateAll(formData);
      showResults(lastResults);
    } catch (e) {
      console.error('SIR calculation error:', e);
      alert(t('calculation_error'));
    }
    nextBtn.disabled = false;
  }, 150);
}

// ===================== RESULTS DISPLAY =====================
function showResults(r) {
  $('#sir-form-area').style.display = 'none';
  $('.sir-nav').style.display = 'none';
  $('.sir-progress').style.display = 'none';
  $('#sir-results').style.display = 'block';

  var passes = r.passes;
  var total = r.total_score;
  var max = THRESHOLDS.total ? THRESHOLDS.total.max : 57.5;
  var pct = r.dimensions.total ? r.dimensions.total.pct : 0;

  $('#sir-results-header').innerHTML =
    '<div class="sir-result-badge ' + (passes ? 'sir-pass' : 'sir-fail') + '">' + (passes ? t('result_pass') : t('result_fail')) + '</div>' +
    '<div class="sir-result-score">' +
      '<span class="sir-score-big">' + total + '</span>' +
      '<span class="sir-score-max"> / ' + max + '</span>' +
      '<span class="sir-score-pct"> (' + pct + '%)</span>' +
    '</div>' +
    (r.avg_etc ? '<div class="sir-etc-info">' + t('etc_label') + ': <strong>' + r.avg_etc + '</strong></div>' : '');

  var dimNames = { social: t('dim_social'), etico: t('dim_etico'), ambiental: t('dim_ambiental'), economico: t('dim_economico') };
  var dimColors = { social: 'var(--sir-social)', etico: 'var(--sir-etico)', ambiental: 'var(--sir-ambiental)', economico: 'var(--sir-economico)' };

  var dimHtml = '<div class="sir-dims-grid">';
  ['social', 'etico', 'ambiental', 'economico'].forEach(function(dim) {
    var d = r.dimensions[dim];
    if (!d) return;
    var pctBar = Math.min(100, (d.score / d.max) * 100);
    var minLine = (d.min / d.max) * 100;
    dimHtml += '<div class="sir-dim-card ' + (d.passes ? '' : 'sir-dim-fail') + '">' +
      '<div class="sir-dim-name" style="color:' + dimColors[dim] + '">' + dimNames[dim] + '</div>' +
      '<div class="sir-dim-score">' + d.score + ' / ' + d.max + '</div>' +
      '<div class="sir-dim-bar-wrap">' +
        '<div class="sir-dim-bar" style="width:' + pctBar + '%;background:' + dimColors[dim] + ';"></div>' +
        '<div class="sir-dim-min-line" style="left:' + minLine + '%;" title="' + t('minimum') + ': ' + d.min + '"></div>' +
      '</div>' +
      '<div class="sir-dim-status">' + (d.passes ? t('passes') : t('not_passes')) + ' (' + t('minimum') + ': ' + d.min + ')</div>' +
    '</div>';
  });
  dimHtml += '</div>';
  $('#sir-results-dimensions').innerHTML = dimHtml;

  var tableHtml = '<table class="sir-indicators-table"><thead><tr>' +
    '<th>' + t('code') + '</th><th>' + t('indicator') + '</th><th>' + t('ratio') + '</th><th>' + t('level') + '</th><th>' + t('points') + '</th></tr></thead><tbody>';

  var currentDim = '';
  Object.keys(r.indicators).forEach(function(code) {
    var ind = r.indicators[code];
    if (ind.dimension !== currentDim) {
      currentDim = ind.dimension;
      tableHtml += '<tr class="sir-dim-row"><td colspan="5" style="background:' + dimColors[currentDim] + ';color:#0d0c1a;font-weight:700;">' + dimNames[currentDim] + '</td></tr>';
    }
    var ratioStr = ind.ratio !== null ? parseFloat(ind.ratio).toFixed(4) : '—';
    var barPct = ind.max_points > 0 ? Math.round((ind.points / ind.max_points) * 100) : 0;
    tableHtml += '<tr class="' + (ind.points === 0 ? 'sir-row-zero' : '') + '">' +
      '<td class="sir-code-cell">' + ind.code + '</td>' +
      '<td>' + ind.name + '</td>' +
      '<td class="sir-mono">' + ratioStr + '</td>' +
      '<td class="sir-center">' + ind.level + '/' + ind.max_level + '</td>' +
      '<td><div class="sir-points-bar"><div class="sir-points-fill" style="width:' + barPct + '%;"></div><span>' + ind.points + '/' + ind.max_points + '</span></div></td>' +
    '</tr>';
  });
  tableHtml += '</tbody></table>';
  $('#sir-results-indicators').innerHTML = tableHtml;

  applyI18n();

  window.scrollTo({ top: $wrap.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
}

// ===================== EXPORT =====================
function doExport() {
  if (!lastResults) return;
  var btn = $('#sir-btn-export');
  btn.disabled = true;
  try {
    var html = generateReportHtml(formData, lastResults, lang);
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'informe-sir-' + (formData.A1 || 'empresa') + '-' + new Date().toISOString().split('T')[0] + '.html';
    a.click();
    setTimeout(function() { URL.revokeObjectURL(url); }, 4000);
  } finally {
    btn.disabled = false;
  }
}

// ===================== EVENT BINDINGS =====================
function bindEvents() {
  $('#sir-btn-next').addEventListener('click', goNext);
  $('#sir-btn-prev').addEventListener('click', goPrev);
  $('#sir-btn-save').addEventListener('click', function() {
    persistProgress();
    showSaveToast();
  });
  document.addEventListener('click', function(e) {
    if (e.target.closest('#sir-btn-export')) doExport();
    if (e.target.closest('#sir-btn-recalc')) {
      $('#sir-results').style.display = 'none';
      $('#sir-form-area').style.display = 'block';
      $('.sir-nav').style.display = 'flex';
      $('.sir-progress').style.display = 'block';
      updateNav();
      updateProgressBar();
    }
  });

  $all('.sir-lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var newLang = btn.dataset.lang;
      if (newLang !== lang) switchLang(newLang);
    });
  });

  document.addEventListener('keydown', function(e) {
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if ($('#sir-results').style.display === 'block') return;
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  });
}

var SAVE_TOAST_TEXT = {
  es: 'Progreso guardado en este navegador',
  va: 'Progrés guardat en este navegador',
  en: 'Progress saved in this browser',
};

function showSaveToast() {
  var toast = $('#sir-save-toast');
  if (!toast) return;
  toast.textContent = SAVE_TOAST_TEXT[lang] || SAVE_TOAST_TEXT.es;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

// ===================== INIT =====================
loadSavedProgress();
initLang();
renderProgressSteps();
renderCurrentSection();
updateNav();
bindEvents();
applyI18n();

// ===================== PUBLIC API =====================
window.SIR = {
  goNext: goNext,
  goPrev: goPrev,
};

})();
