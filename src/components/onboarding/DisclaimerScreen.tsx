'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

// ── Disclaimer content by locale ──────────────────────────────────

interface Section {
  heading: string | null;
  body: string;
}

interface LocaleContent {
  title: string;
  subtitle: string;
  checkboxLabel: string;
  confirmLabel: string;
  intro: string;
  sections: Section[];
  footer: string;
}

const CONTENT: Record<string, LocaleContent> = {
  en: {
    title: 'Before we begin',
    subtitle: 'Please read and acknowledge the following.',
    checkboxLabel: 'I have read and understood this notice.',
    confirmLabel: '🔒 I understand and agree',
    intro:
      'Tiny Bites is not a medical app. Everything in this application — recipes, meal plans, feeding suggestions, and nutritional information — is for general information and educational purposes only. Nothing here is medical advice.',
    sections: [
      {
        heading: '1. Not a medical device',
        body:
          'Tiny Bites has not been approved or authorized by the Israeli Ministry of Health, the FDA, any EU regulatory body, or any other health authority. Using this app does not create any professional relationship between you and Tiny Bites.',
      },
      {
        heading: '2. Always consult your child\'s doctor',
        body:
          'Before introducing new foods or changing your child\'s diet, always speak with your child\'s pediatrician or a qualified healthcare professional. Do not ignore or delay professional medical advice because of anything you read here. In a medical emergency call: Magen David Adom 101 · Europe 112 · USA 911.',
      },
      {
        heading: '3. No liability for content or recipes',
        body:
          'All content is provided "as is" without any guarantee of accuracy or suitability for your child\'s individual needs. Nutritional values are approximate. Tiny Bites accepts no responsibility for any outcome arising from use of this app, including adverse health outcomes, allergic reactions, or feeding-related incidents.',
      },
      {
        heading: '4. Allergen & choking warning',
        body:
          'Always check every ingredient independently if your child has allergies or intolerances. Choking is a serious risk — always supervise your child while eating and ensure food is prepared in a safe, age-appropriate way. We recommend all caregivers complete infant choking first-aid training.',
      },
      {
        heading: '5. Who can use this app',
        body:
          'By agreeing, you confirm you are at least 18 years old and are a parent, legal guardian, or authorized caregiver of the child for whom you are using this app. You accept full responsibility for all feeding decisions.',
      },
    ],
    footer:
      'Governing law: State of Israel. In case of conflict between language versions, the Hebrew version prevails. Disputes: exclusive jurisdiction of the courts of Tel Aviv-Jaffa. Tiny Bites · 2025',
  },

  he: {
    title: 'לפני שמתחילים',
    subtitle: 'נא לקרוא ולאשר את הבא.',
    checkboxLabel: 'קראתי והבנתי את ההודעה.',
    confirmLabel: '🔒 קראתי ומסכים/ה',
    intro:
      'Tiny Bites אינה אפליקציה רפואית. כל התכנים באפליקציה — מתכונים, תוכניות ארוחות, המלצות האכלה ומידע תזונתי — מסופקים למטרות מידע כללי וחינוכי בלבד. אין בתכנים אלה משום ייעוץ רפואי.',
    sections: [
      {
        heading: '1. לא מכשיר רפואי',
        body:
          'Tiny Bites לא אושרה על ידי משרד הבריאות הישראלי, ה-FDA, כל גוף רגולטורי של האיחוד האירופי, או כל רשות בריאות אחרת. השימוש באפליקציה אינו יוצר כל קשר מקצועי בינכם לבין Tiny Bites.',
      },
      {
        heading: '2. תמיד התייעצו עם רופא הילדים',
        body:
          'לפני הכנסת מזונות חדשים או שינוי תזונת ילדכם, פנו תמיד לרופא הילדים או לאיש מקצוע מוסמך. אין לדחות ייעוץ רפואי בשל מידע שנקרא באפליקציה. במצב חירום: מד"א 101 · אירופה 112 · ארה"ב 911.',
      },
      {
        heading: '3. העדר אחריות לתכנים ולמתכונים',
        body:
          'כל התכנים מסופקים "כמות שהם" ללא כל ערובה לדיוקם או התאמתם לצרכי ילדכם. ערכי התזונה הם קירוביים. Tiny Bites אינה נושאת אחריות לכל תוצאה הנובעת משימוש באפליקציה, לרבות תוצאות בריאותיות שליליות, תגובות אלרגיות, או אירועי האכלה.',
      },
      {
        heading: '4. אזהרת אלרגנים וחנק',
        body:
          'בדקו תמיד כל מרכיב בנפרד אם לילדכם יש אלרגיות. חנק הוא סיכון חמור — השגיחו תמיד על ילדכם בעת האכילה והבטיחו כי המזון מוכן בצורה בטוחה ומותאמת לגיל. אנו ממליצים לכל המטפלים לעבור הכשרה בעזרה ראשונה לחנק תינוקות.',
      },
      {
        heading: '5. מי רשאי להשתמש באפליקציה',
        body:
          'בלחיצה על הכפתור, אתם מאשרים כי אתם בני 18 לפחות וכי אתם הורה, אפוטרופוס חוקי, או מטפל מורשה של הילד עבורו אתם משתמשים באפליקציה. אתם מקבלים אחריות מלאה לכל החלטות ההאכלה.',
      },
    ],
    footer:
      'הדין החל: מדינת ישראל. במחלוקת בין גרסאות — הגרסה העברית גוברת. סמכות שיפוט: בתי המשפט בתל אביב-יפו. Tiny Bites · 2025',
  },

  ru: {
    title: 'Прежде чем начать',
    subtitle: 'Пожалуйста, прочитайте и подтвердите следующее.',
    checkboxLabel: 'Я прочитал(а) и понял(а) это уведомление.',
    confirmLabel: '🔒 Я прочитал(а) и согласен/согласна',
    intro:
      'Tiny Bites не является медицинским приложением. Весь контент приложения — рецепты, планы питания, рекомендации по кормлению и информация о пищевой ценности — предоставляется исключительно в общих информационных и образовательных целях. Ничто здесь не является медицинской консультацией.',
    sections: [
      {
        heading: '1. Не является медицинским изделием',
        body:
          'Tiny Bites не было одобрено Министерством здравоохранения Израиля, FDA, каким-либо регуляторным органом ЕС или иным органом здравоохранения. Использование приложения не создаёт профессиональных отношений между вами и Tiny Bites.',
      },
      {
        heading: '2. Всегда консультируйтесь с врачом вашего ребёнка',
        body:
          'Прежде чем вводить новые продукты или изменять рацион, обращайтесь к педиатру или квалифицированному специалисту. Не игнорируйте медицинские консультации из-за информации в приложении. При экстренной ситуации: МДА 101 · Европа 112 · США 911.',
      },
      {
        heading: '3. Отказ от ответственности за контент и рецепты',
        body:
          'Весь контент предоставляется «как есть» без гарантий точности или соответствия потребностям вашего ребёнка. Показатели пищевой ценности приблизительны. Tiny Bites не несёт ответственности за последствия использования приложения, включая неблагоприятные последствия для здоровья, аллергические реакции или инциденты при кормлении.',
      },
      {
        heading: '4. Предупреждение об аллергенах и удушье',
        body:
          'Всегда самостоятельно проверяйте каждый ингредиент при наличии аллергий. Удушье — серьёзная угроза: всегда присматривайте за ребёнком во время еды и обеспечивайте безопасное приготовление пищи. Рекомендуем всем пройти обучение первой помощи при удушье у младенцев.',
      },
      {
        heading: '5. Кто может использовать это приложение',
        body:
          'Нажимая кнопку, вы подтверждаете, что вам 18 лет и более и что вы являетесь родителем, законным опекуном или уполномоченным лицом для ребёнка, для которого используется приложение. Вы принимаете полную ответственность за все решения по кормлению.',
      },
    ],
    footer:
      'Применимое право: Государство Израиль. При расхождении версий преимущество за ивритской. Споры: суды Тель-Авива — Яффо. Tiny Bites · 2025',
  },
};

// ── Component ─────────────────────────────────────────────────────

interface DisclaimerScreenProps {
  onComplete: () => void;
}

export function DisclaimerScreen({ onComplete }: DisclaimerScreenProps) {
  const locale = useLocale();
  const [checked, setChecked] = useState(false);

  const content = CONTENT[locale] ?? CONTENT.en;
  const isRTL = locale === 'he';

  function handleConfirm() {
    localStorage.setItem(
      'tb_disclaimer',
      JSON.stringify({ accepted: true, timestamp: Date.now(), locale })
    );
    onComplete();
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backdropFilter: 'blur(6px)',
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: 'min(480px, 92vw)',
          maxHeight: '88vh',
          borderRadius: '1.5rem',
          background: 'white',
          border: '0.5px solid var(--th-primary-dim)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            padding: '1.25rem 1.5rem 1rem',
            borderBottom: '1px solid var(--th-primary-dim)',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '1.75rem', lineHeight: 1, marginBottom: '0.5rem' }}>🍼</div>
          <h2
            style={{
              margin: 0,
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: 'var(--th-primary-darker)',
            }}
          >
            {content.title}
          </h2>
          <p
            style={{
              margin: '0.25rem 0 0',
              fontSize: '0.8125rem',
              color: '#6b7280',
            }}
          >
            {content.subtitle}
          </p>
        </div>

        {/* ── BODY (scrollable) ── */}
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            background: 'var(--th-light)',
            fontSize: '13px',
            lineHeight: 1.75,
            color: '#374151',
          }}
        >
          {/* Intro paragraph */}
          <p style={{ marginTop: 0, marginBottom: '1rem' }}>{content.intro}</p>

          {/* Numbered sections */}
          {content.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <p style={{ margin: '0 0 0.25rem', fontWeight: 500, fontSize: '13px' }}>
                {section.heading}
              </p>
              <p style={{ margin: 0 }}>{section.body}</p>
            </div>
          ))}

          {/* Footer note */}
          <p
            style={{
              marginTop: '1.25rem',
              marginBottom: 0,
              fontSize: '11px',
              color: '#9ca3af',
              borderTop: '1px solid var(--th-primary-dim)',
              paddingTop: '0.75rem',
            }}
          >
            {content.footer}
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--th-primary-dim)',
            flexShrink: 0,
          }}
        >
          {/* Checkbox row */}
          <label
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
              cursor: 'pointer',
              marginBottom: '0.875rem',
            }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              style={{
                marginTop: '0.125rem',
                width: '1rem',
                height: '1rem',
                flexShrink: 0,
                accentColor: 'var(--th-primary)',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.8125rem', color: '#374151', lineHeight: 1.5 }}>
              {content.checkboxLabel}
            </span>
          </label>

          {/* Confirm button */}
          <button
            disabled={!checked}
            onClick={handleConfirm}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: checked ? 'var(--th-primary)' : 'var(--th-primary-dim)',
              color: checked ? 'white' : '#9ca3af',
              fontSize: '0.9375rem',
              fontWeight: 700,
              cursor: checked ? 'pointer' : 'not-allowed',
              transition: 'background 0.3s ease, color 0.3s ease',
              letterSpacing: '0.01em',
            }}
          >
            {content.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
