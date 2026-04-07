'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

// ── Disclaimer content constants ──────────────────────────────────

interface Section {
  heading: string;
  body: string;
}

interface LocaleContent {
  title: string;
  subtitle: string;
  checkboxLabel: string;
  confirmLabel: string;
  sections: Section[];
}

const CONTENT_EN: LocaleContent = {
  title: 'Before we begin',
  subtitle: 'Please read the notice below.',
  checkboxLabel: 'I have read and understood this notice.',
  confirmLabel: '🔒 I understand and agree',
  sections: [
    {
      heading: 'Tiny Bites is not a medical app.',
      body: 'Everything in this application — recipes, meal plans, feeding suggestions, and nutritional information — is for general information and educational purposes only. Nothing here is medical advice.',
    },
    {
      heading: '1. Not a medical device',
      body: "Tiny Bites has not been approved or authorized by the Israeli Ministry of Health, the FDA, any EU regulatory body, or any other health authority. Using this app does not create any professional relationship between you and Tiny Bites.",
    },
    {
      heading: "2. Always consult your child's doctor",
      body: "Before introducing new foods or changing your child's diet, always speak with your child's pediatrician or a qualified healthcare professional. Do not ignore or delay professional medical advice because of anything you read here. In a medical emergency call: Magen David Adom 101 · Europe 112 · USA 911.",
    },
    {
      heading: '3. No liability for content or recipes',
      body: 'All content is provided "as is" without any guarantee of accuracy or suitability for your child\'s individual needs. Nutritional values are approximate. Tiny Bites accepts no responsibility for any outcome arising from use of this app, including adverse health outcomes, allergic reactions, or feeding-related incidents.',
    },
    {
      heading: '4. Allergen & choking warning',
      body: 'Always check every ingredient independently if your child has allergies or intolerances. Choking is a serious risk — always supervise your child while eating and ensure food is prepared in a safe, age-appropriate way.',
    },
    {
      heading: '5. Who can use this app',
      body: 'By agreeing, you confirm you are at least 18 years old and are a parent, legal guardian, or authorized caregiver. You accept full responsibility for all feeding decisions. Governing law: State of Israel. Disputes: courts of Tel Aviv-Jaffa. Tiny Bites · 2025',
    },
  ],
};

const CONTENT_HE: LocaleContent = {
  title: 'לפני שמתחילים',
  subtitle: 'נא לקרוא את ההודעה הבאה.',
  checkboxLabel: 'קראתי והבנתי את ההודעה.',
  confirmLabel: '🔒 קראתי ומסכים/ה',
  sections: [
    {
      heading: 'Tiny Bites אינה אפליקציה רפואית.',
      body: 'כל התכנים באפליקציה — מתכונים, תוכניות ארוחות, המלצות האכלה ומידע תזונתי — מסופקים למטרות מידע כללי וחינוכי בלבד. אין בתכנים אלה משום ייעוץ רפואי.',
    },
    {
      heading: '1. לא מכשיר רפואי',
      body: 'Tiny Bites לא אושרה על ידי משרד הבריאות הישראלי, ה-FDA, כל גוף רגולטורי של האיחוד האירופי, או כל רשות בריאות אחרת. השימוש באפליקציה אינו יוצר כל קשר מקצועי בינכם לבין Tiny Bites.',
    },
    {
      heading: '2. תמיד התייעצו עם רופא הילדים',
      body: 'לפני הכנסת מזונות חדשים או שינוי תזונת ילדכם, פנו תמיד לרופא הילדים או לאיש מקצוע מוסמך. אין לדחות ייעוץ רפואי בשל מידע שנקרא באפליקציה. במצב חירום: מד"א 101 · אירופה 112 · ארה"ב 911.',
    },
    {
      heading: '3. העדר אחריות לתכנים ולמתכונים',
      body: 'כל התכנים מסופקים "כמות שהם" ללא כל ערובה לדיוקם או התאמתם לצרכי ילדכם. ערכי התזונה הם קירוביים. Tiny Bites אינה נושאת אחריות לכל תוצאה הנובעת משימוש באפליקציה, לרבות תגובות אלרגיות או אירועי האכלה.',
    },
    {
      heading: '4. אזהרת אלרגנים וחנק',
      body: 'בדקו תמיד כל מרכיב בנפרד אם לילדכם יש אלרגיות. חנק הוא סיכון חמור — השגיחו תמיד על ילדכם בעת האכילה והבטיחו כי המזון מוכן בצורה בטוחה ומותאמת לגיל.',
    },
    {
      heading: '5. מי רשאי להשתמש באפליקציה',
      body: 'בלחיצה על הכפתור, אתם מאשרים כי אתם בני 18 לפחות וכי אתם הורה, אפוטרופוס חוקי, או מטפל מורשה. אתם מקבלים אחריות מלאה לכל החלטות ההאכלה. הדין החל: מדינת ישראל. סמכות שיפוט: בתי המשפט בתל אביב-יפו. Tiny Bites · 2025',
    },
  ],
};

const CONTENT_RU: LocaleContent = {
  title: 'Прежде чем начать',
  subtitle: 'Пожалуйста, прочитайте уведомление ниже.',
  checkboxLabel: 'Я прочитал(а) и понял(а) это уведомление.',
  confirmLabel: '🔒 Я прочитал(а) и согласен/согласна',
  sections: [
    {
      heading: 'Tiny Bites не является медицинским приложением.',
      body: 'Весь контент приложения — рецепты, планы питания, рекомендации по кормлению и информация о пищевой ценности — предоставляется исключительно в общих информационных и образовательных целях. Ничто здесь не является медицинской консультацией.',
    },
    {
      heading: '1. Не является медицинским изделием',
      body: 'Tiny Bites не было одобрено Министерством здравоохранения Израиля, FDA, каким-либо регуляторным органом ЕС или иным органом здравоохранения. Использование приложения не создаёт профессиональных отношений между вами и Tiny Bites.',
    },
    {
      heading: '2. Всегда консультируйтесь с врачом вашего ребёнка',
      body: 'Прежде чем вводить новые продукты или изменять рацион, обращайтесь к педиатру или квалифицированному специалисту. Не игнорируйте медицинские консультации из-за информации в приложении. При экстренной ситуации: МДА 101 · Европа 112 · США 911.',
    },
    {
      heading: '3. Отказ от ответственности за контент и рецепты',
      body: 'Весь контент предоставляется «как есть» без гарантий точности или соответствия потребностям вашего ребёнка. Показатели пищевой ценности приблизительны. Tiny Bites не несёт ответственности за последствия использования приложения, включая аллергические реакции или инциденты при кормлении.',
    },
    {
      heading: '4. Предупреждение об аллергенах и удушье',
      body: 'Всегда самостоятельно проверяйте каждый ингредиент при наличии аллергий. Удушье — серьёзная угроза: всегда присматривайте за ребёнком во время еды и обеспечивайте безопасное приготовление пищи.',
    },
    {
      heading: '5. Кто может использовать это приложение',
      body: 'Нажимая кнопку, вы подтверждаете, что вам 18 лет и более и что вы являетесь родителем, законным опекуном или уполномоченным лицом. Вы принимаете полную ответственность за решения по кормлению. Применимое право: Государство Израиль. Споры: суды Тель-Авива — Яффо. Tiny Bites · 2025',
    },
  ],
};

const CONTENT: Record<string, LocaleContent> = {
  en: CONTENT_EN,
  he: CONTENT_HE,
  ru: CONTENT_RU,
};

// ── Component ─────────────────────────────────────────────────────

interface DisclaimerScreenProps {
  onComplete: () => void;
}

export function DisclaimerScreen({ onComplete }: DisclaimerScreenProps) {
  const locale = useLocale();
  const [checked, setChecked] = useState(false);

  const content = CONTENT[locale] ?? CONTENT_EN;
  const isRTL = locale === 'he';

  function handleConfirm() {
    localStorage.setItem(
      'tb_disclaimer',
      JSON.stringify({ accepted: true, timestamp: Date.now(), locale })
    );
    onComplete();
  }

  return (
    /* Fixed full-viewport container */
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>

      {/* Layer 1 — backdrop (no animation, appears instantly) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(6px)',
          background: 'rgba(0, 0, 0, 0.35)',
        }}
      />

      {/* Layer 2 — disclaimer card (slides up from bottom) */}
      <div
        className="disclaimer-card-slide"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: 'min(480px, 100vw)',
          maxHeight: '88vh',
          borderRadius: 'var(--border-radius-xl) var(--border-radius-xl) 0 0',
          background: 'var(--color-background-primary)',
          borderTop: '0.5px solid var(--color-border-tertiary)',
          borderLeft: '0.5px solid var(--color-border-tertiary)',
          borderRight: '0.5px solid var(--color-border-tertiary)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >

        {/* ── HEADER (fixed) ── */}
        <div style={{ flexShrink: 0 }}>
          {/* Drag-handle pill */}
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: 'var(--color-border-secondary)',
              margin: '10px auto 0',
            }}
          />
          {/* Title */}
          <h2
            style={{
              margin: '12px 0 0',
              fontSize: 16,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {content.title}
          </h2>
          {/* Subtitle */}
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 13,
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
            }}
          >
            {content.subtitle}
          </p>
          {/* Divider */}
          <div
            style={{
              height: '0.5px',
              background: 'var(--color-border-tertiary)',
              margin: '12px 0 0',
            }}
          />
        </div>

        {/* ── BODY (scrollable) ── */}
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'var(--color-background-secondary)',
            padding: '1.25rem',
            fontSize: 13,
            lineHeight: 1.75,
          }}
        >
          {content.sections.map((section, i) => (
            <div
              key={i}
              style={{ marginBottom: i < content.sections.length - 1 ? '1rem' : 0 }}
            >
              <p style={{ margin: '0 0 0.25rem', fontWeight: 600 }}>
                {section.heading}
              </p>
              <p style={{ margin: 0 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── FOOTER (fixed) ── */}
        <div style={{ flexShrink: 0 }}>
          {/* Divider above */}
          <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)' }} />
          <div
            style={{
              background: 'var(--color-background-primary)',
              padding: '1rem 1.25rem',
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
              <span style={{ fontSize: 13, lineHeight: 1.5 }}>
                {content.checkboxLabel}
              </span>
            </label>

            {/* Confirm button */}
            <button
              disabled={!checked}
              onClick={handleConfirm}
              style={{
                marginTop: 10,
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-md)',
                border: 'none',
                background: 'var(--th-primary)',
                color: 'white',
                fontSize: 15,
                fontWeight: 500,
                cursor: checked ? 'pointer' : 'not-allowed',
                opacity: checked ? 1 : 0.4,
                transition: 'opacity 0.3s ease',
              }}
            >
              {content.confirmLabel}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
