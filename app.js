/* ============================================================
   AAYED — Shared App Engine (MVP HTML)
   State · i18n · Mock Data · Shared UI helpers
   ============================================================ */

/* ── Brand Logo SVG ─────────────────────────────────────────
   Inline SVG recreation of the AAYED logo mark:
   Arabic ع (ain) letterform fused with an upward arrow,
   forming a continuous flowing curve — dark green #1d5c1d
   ──────────────────────────────────────────────────────── */
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" fill="#1d5c1d" aria-label="AAYED logo">
  <!-- Left loop: the body of the ع letter -->
  <path d="
    M 30 58
    C 14 58, 8 46, 8 38
    C 8 26, 17 18, 28 18
    C 38 18, 45 25, 46 34
    C 47 42, 42 50, 34 52
    C 28 54, 22 50, 22 44
    C 22 38, 27 34, 33 35
    C 38 36, 40 40, 37 44
    C 35 47, 31 46, 30 43
  " stroke="#1d5c1d" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Right sweep: flowing tail curving up into the arrow shaft -->
  <path d="
    M 46 34
    C 50 24, 58 16, 68 14
    C 78 12, 86 18, 90 26
    C 94 34, 90 44, 82 50
    C 74 56, 62 56, 54 50
    C 48 46, 46 40, 46 34
  " stroke="#1d5c1d" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Arrow head pointing upper-right -->
  <polyline points="82,14 96,10 92,24" stroke="#1d5c1d" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="82" y1="14" x2="96" y2="10" stroke="#1d5c1d" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* ── State ──────────────────────────────────────────────── */
const State = (() => {
  let _user = JSON.parse(sessionStorage.getItem('aayed_user') || 'null');
  let _lang = localStorage.getItem('aayed_lang') || 'ar';
  const _listeners = [];

  function notify() { _listeners.forEach(fn => fn()); }

  return {
    get user() { return _user; },
    get lang() { return _lang; },

    setUser(u) {
      _user = u;
      sessionStorage.setItem('aayed_user', JSON.stringify(u));
      notify();
    },
    setLang(l) {
      _lang = l;
      localStorage.setItem('aayed_lang', l);
      document.documentElement.lang = l;
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
      notify();
    },
    toggleLang() { State.setLang(_lang === 'ar' ? 'en' : 'ar'); },
    logout() { State.setUser(null); },
    onChange(fn) { _listeners.push(fn); },
  };
})();

/* Apply lang on load */
document.documentElement.lang = State.lang;
document.documentElement.dir = State.lang === 'ar' ? 'rtl' : 'ltr';

/* ── i18n ────────────────────────────────────────────────── */
const I18N = {
  ar: {
    nav: { home:'الرئيسية', howItWorks:'كيف يعمل عائد', marketOpportunity:'فرصة السوق', competitors:'الحلول الحالية', login:'تسجيل الدخول', register:'إنشاء حساب', logout:'تسجيل الخروج', dashboard:'لوحة التحكم', myAssets:'أصولي', addAsset:'إضافة أصل', matches:'التطابقات', receivedOffers:'العروض الواردة', compareOffers:'مقارنة العروض', agreements:'الاتفاقيات', activeProjects:'المشاريع النشطة', returns:'العوائد', requirements:'متطلبات الاستثمار', aiMatches:'نتائج الذكاء الاصطناعي', projects:'المشاريع', payments:'المدفوعات', users:'المستخدمون', assets:'الأصول', reports:'التقارير', commissions:'العمولات' },
    hero: { tagline:'استثمر أصلك غير المستغل', taglineSub:'منصة سعودية تربط أصحاب الأصول المتقاعدين بالمشغّلين المناسبين', ctaOwner:'استثمر أصلي', ctaInvestor:'أبحث عن أصل للاستثمار', ctaLearnMore:'اعرف أكثر' },
    problem: { title:'المشكلة التي يحلّها عائد', ownerTitle:'صاحب الأصل المتقاعد', ownerDesc:'يمتلك أصلاً غير مستغل — مزرعة أو أرضاً أو عقاراً أو محلاً — لكنه لا يريد الانخراط في تشغيل مشروع يومي أو إدارة موظفين.', investorTitle:'المشغّل / المشغّل', investorDesc:'لديه فكرة مشروع ورأس مال وخبرة تشغيلية، لكنه يحتاج إلى أصل مناسب بالموقع والمرافق التي يبحث عنها.', gapTitle:'الفجوة', gapDesc:'عائد يسد الفجوة بين صاحب أصل لا يريد تشغيل مشروع، ومشغّل يستطيع تشغيل مشروع لكنه يحتاج الأصل المناسب.' },
    forWhom: { title:'لمن صُمِّم عائد؟', ownerTitle:'صاحب الأصل المتقاعد', ownerPoints:['يمتلك أصلاً غير مستغل','يريد عائداً مالياً دون إدارة يومية','يحتفظ بالملكية الكاملة للأصل','يريد مراجعة المشغّلين والعروض'], investorTitle:'المشغّل', investorPoints:['لديه فكرة مشروع أو خبرة تشغيلية','يحتاج أصلاً مناسباً بمتطلبات محددة','يريد إيجاد الأصل المناسب بشكل أسرع','يريد تقديم عرض تشغيل واضح'] },
    valueProposition: { title:'القيمة التي يقدّمها عائد', coreValue:'عائد لا يعرض عقارات فحسب — بل يربط الأصل المناسب بالمشغّل المناسب.', ownerValue:'استفد من أصلك غير المستغل دون الحاجة إلى تشغيل المشروع بنفسك.', investorValue:'اعثر على الأصل الأنسب لمشروعك بشكل أسرع من خلال المطابقة الذكية.' },
    howItWorks: { title:'كيف يعمل عائد', subtitle:'سيناريو أبو فهد وخالد', ownershipNote:'الأصل لا يُباع أبداً — الملكية دائماً لصاحبها', steps:[ {t:'أبو فهد يضيف مزرعته',d:'سجّل أبو فهد في عائد واختار «استثمر أصلي»، ثم أضاف مزرعته في الرياض مع تفاصيلها ومرافقها.'},{t:'المشرف يراجع ويوافق',d:'راجع مشرف عائد بيانات المزرعة والوثائق، ثم وافق على نشرها.'},{t:'خالد يدخل متطلباته',d:'سجّل خالد واختار «أبحث عن أصل»، ثم أدخل متطلبات مشروعه: صالون خارجي موسمي في الرياض.'},{t:'الذكاء الاصطناعي يحلّل ويطابق',d:'حلّل ذكاء عائد الاصطناعي المتطلبات وقارنها بالأصول المتاحة.'},{t:'مزرعة أبو فهد — 92% تطابق',d:'أوصى الذكاء الاصطناعي بمزرعة أبو فهد كأفضل تطابق مع 4 أسباب واضحة.'},{t:'خالد يقدّم عرضاً',d:'راجع خالد تفاصيل المزرعة وتفسير التطابق، ثم قدّم عرضه الاستثماري.'},{t:'أبو فهد يراجع ويقبل',d:'استلم أبو فهد العرض وراجعه، ثم قبله.'},{t:'الاتفاقية وتفعيل المشروع',d:'وقّع الطرفان الاتفاقية التي تتضمن عمولة عائد 2.5٪.'},{t:'أبو فهد يتابع عوائده',d:'يتابع أبو فهد عوائده عبر عائد دون أي تدخل في العمليات اليومية.',note:'الأصل لا يُباع أبداً'} ] },
    market: { title:'فرصة السوق', subtitle:'فرصة السوق | Market Opportunity', disclaimer:'ملاحظة: الأرقام أدناه تمثّل النظام البيئي للسوق السعودي بشكل عام، وليس قاعدة عملاء عائد المؤكدة.', targetNote:'الشريحة المستهدفة لعائد هي فرعية من هذا السوق — متقاعدون يمتلكون أصولاً غير مستغلة، ومشغّلون يبحثون عن أصول مناسبة.', q5q7Note:'تحذير أكاديمي: الأسئلة حول «هل يريد العميل الحل؟» فرضيات تتطلب التحقق مع مستخدمين حقيقيين.', source:'المصدر' },
    competitors: { title:'الحلول الحالية', subtitle:'الحلول الحالية | Current Alternatives', currentJourneyTitle:'رحلة العميل الحالية — متفرقة', ownerJourney:'رحلة صاحب الأصل اليوم', investorJourney:'رحلة المشغّل اليوم', aayedJourney:'رحلة عائد — متكاملة في منصة واحدة', comparisonTitle:'مقارنة عائد بالبدائل', differentiationTitle:'لماذا عائد مختلف؟', differentiationDesc:'عائد ليس سوق عقارات آخر. هدفه الأساسي هو إيجاد المشغّل المناسب للأصل غير المستغل.' },
    general: { welcomeTitle:'أهلاً بك في عائد', welcomeDesc:'اختر مسارك للبدء', ownerCardTitle:'استثمر أصلي', ownerCardDesc:'إذا كنت متقاعداً وتمتلك أصلاً غير مستغل وتريد الاستفادة منه مالياً دون إدارة يومية.', ownerCardCta:'ابدأ كصاحب أصل', investorCardTitle:'أبحث عن أصل للاستثمار', investorCardDesc:'إذا كنت مشغّلاً أو رائد أعمال لديك فكرة مشروع وتبحث عن الأصل المناسب.', investorCardCta:'ابدأ كمشغّل' },
    auth: { loginTitle:'تسجيل الدخول', registerTitle:'إنشاء حساب جديد', fullName:'الاسم الكامل', email:'البريد الإلكتروني', phone:'رقم الجوال', password:'كلمة المرور', confirmPassword:'تأكيد كلمة المرور', loginBtn:'دخول', registerBtn:'إنشاء الحساب', noAccount:'ليس لديك حساب؟', hasAccount:'لديك حساب بالفعل؟', registerLink:'سجّل الآن', loginLink:'تسجيل الدخول', adminTitle:'دخول المشرف', adminBtn:'دخول المشرف', demoHint:'نموذج تجريبي — أي بيانات تعمل', demoAccounts:'حسابات تجريبية' },
    onboarding: { ownerTitle:'تأهيل صاحب الأصل', investorTitle:'تأهيل المشغّل', retiredConfirm:'أؤكد أنني متقاعد وأمتلك أصلاً أريد استثماره', investorConfirm:'أؤكد أنني مشغّل أو رائد أعمال أبحث عن أصل مناسب', commissionNote:'تحصّل عائد عمولة 2.5٪ على قيمة الاتفاقية. تُعرض بشفافية في كل اتفاقية.', ownershipNote:'الأصل لا يُباع أبداً. تبقى الملكية الكاملة لصاحب الأصل في جميع الأوقات.', ownerSteps:[{t:'من أنت؟',d:'تأكيد صفتك كمتقاعد وصاحب أصل'},{t:'بيانات أصلك',d:'معلومات أساسية عن الأصل'},{t:'أهدافك',d:'ما الذي تريده من هذه التجربة'},{t:'شروط المنصة',d:'مراجعة شروط عائد وعمولة 2.5٪'},{t:'التأكيد',d:'مراجعة وتأكيد معلوماتك'}], investorSteps:[{t:'من أنت؟',d:'تأكيد صفتك كمشغّل أو رائد أعمال'},{t:'فكرة مشروعك',d:'نوع المشروع والنشاط التجاري'},{t:'خبرتك وإمكاناتك',d:'خبرتك التشغيلية وقدرتك المالية'},{t:'شروط المنصة',d:'مراجعة شروط عائد وعمولة 2.5٪'},{t:'التأكيد',d:'مراجعة وتأكيد معلوماتك'}] },
    asset: { addTitle:'إضافة أصل جديد', nameLabel:'اسم الأصل', typeLabel:'نوع الأصل', types:{farm:'مزرعة',land:'أرض',property:'عقار / مبنى',shop:'محل تجاري',floor:'طابق',space:'مساحة'}, locationLabel:'الموقع', regionLabel:'المنطقة', cityLabel:'المدينة', districtLabel:'الحي', sizeLabel:'المساحة (م²)', conditionLabel:'حالة الأصل', conditions:{excellent:'ممتازة',good:'جيدة',fair:'مقبولة'}, facilitiesLabel:'المرافق المتوفرة', facilities:{water:'مياه',electricity:'كهرباء',storage:'تخزين',parking:'مواقف',restrooms:'دورات مياه',kitchen:'مطبخ'}, allowedActivitiesLabel:'الأنشطة المسموح بها', restrictionsLabel:'القيود وملاحظات المالك', descriptionLabel:'وصف الأصل', expectedReturnLabel:'توقعات العائد', returnTypes:{fixed:'إيجار ثابت',share:'حصة من الأرباح',both:'مزيج'}, photosHint:'أضف صوراً لزيادة جاذبية الأصل (نموذج تجريبي)', submitAsset:'تقديم الأصل للمراجعة', statuses:{draft:'مسودة',under_review:'قيد المراجعة',approved:'موافق عليه',active:'نشط',rejected:'مرفوض',changes_requested:'مطلوب تعديلات',matched:'تم التطابق'} },
    match: { aiTitle:'نتائج المطابقة الذكية', matchPercent:'نسبة التطابق', reasons:'أسباب التطابق', defaultReasons:['الموقع مطابق','المساحة المطلوبة متوفرة','النشاط المقترح مسموح به','المرافق المطلوبة متوفرة'], viewAsset:'عرض تفاصيل الأصل', submitOffer:'تقديم عرض استثماري', noMatches:'لا توجد تطابقات حالياً' },
    offer: { submitTitle:'تقديم عرض تشغيل', projectDescLabel:'وصف المشروع وخطة التشغيل', periodLabel:'مدة التشغيل المقترحة', financialLabel:'العرض المالي', revenueShare:'حصة من الأرباح', fixedRent:'إيجار ثابت', percentageLabel:'النسبة (%)', amountLabel:'المبلغ (ريال)', meetRequirementsLabel:'كيف تلبّي متطلبات الأصل؟', reviewSubmit:'مراجعة وتقديم العرض', statuses:{pending:'قيد الانتظار',accepted:'مقبول',rejected:'مرفوض'}, acceptOffer:'قبول العرض', rejectOffer:'رفض العرض', viewOffer:'عرض التفاصيل', compareTitle:'مقارنة العروض', investorLabel:'المشغّل', periodTitle:'المدة', financialTitle:'العرض المالي' },
    agreement: { title:'الاتفاقية', partiesTitle:'الأطراف', ownerParty:'صاحب الأصل (المالك)', investorParty:'المشغّل', assetTitle:'الأصل موضوع الاتفاقية', periodTitle:'مدة الاتفاقية', financialTitle:'الترتيب المالي', commissionTitle:'عمولة منصة عائد', commissionNote:'2.5٪ من قيمة الاتفاقية — تُخصم تلقائياً من كل دفعة', ownershipClause:'بند الملكية: يحتفظ صاحب الأصل بالملكية الكاملة طوال مدة الاتفاقية وبعدها.', responsibilitiesTitle:'مسؤوليات الطرفين', ownerResp:'التزامات صاحب الأصل', investorResp:'التزامات المشغّل', statuses:{pending:'بانتظار التوقيع',active:'نشطة',completed:'مكتملة'}, viewAgreement:'عرض الاتفاقية', mockNote:'هذه اتفاقية تجريبية لأغراض النموذج الأكاديمي فقط' },
    returns: { title:'العوائد والمدفوعات', totalExpected:'إجمالي العوائد المتوقعة', totalReceived:'إجمالي العوائد المستلمة', nextPayment:'الدفعة القادمة', commissionDeducted:'العمولة المخصومة (2.5٪)', period:'الفترة', amount:'المبلغ', status:'الحالة', statuses:{paid:'مدفوعة',pending:'معلقة',upcoming:'قادمة'}, chartTitle:'العوائد عبر الزمن' },
    admin: { dashboardTitle:'لوحة تحكم المشرف', totalUsers:'إجمالي المستخدمين', totalAssets:'إجمالي الأصول', underReview:'قيد المراجعة', activeAgreements:'الاتفاقيات النشطة', activeProjects:'المشاريع النشطة', totalCommissions:'إجمالي العمولات', approve:'موافقة', reject:'رفض', requestChanges:'طلب تعديلات' },
    common: { save:'حفظ', cancel:'إلغاء', close:'إغلاق', confirm:'تأكيد', edit:'تعديل', view:'عرض', back:'رجوع', next:'التالي', submit:'إرسال', loading:'جارٍ التحميل...', noData:'لا توجد بيانات', riyal:'ريال', sqm:'م²', years:'سنوات', year:'سنة', months:'أشهر', month:'شهر', platform:'عائد | AAYED', tagline:'منصة ربط الأصول بالمشغّلين', copyright:'© 2024 عائد — نموذج أكاديمي تجريبي', prototype:'نموذج أكاديمي تجريبي' },
  },
  en: {
    nav: { home:'Home', howItWorks:'How AAYED Works', marketOpportunity:'Market Opportunity', competitors:'Current Alternatives', login:'Login', register:'Register', logout:'Logout', dashboard:'Dashboard', myAssets:'My Assets', addAsset:'Add Asset', matches:'Matches', receivedOffers:'Received Offers', compareOffers:'Compare Offers', agreements:'Agreements', activeProjects:'Active Projects', returns:'Returns', requirements:'Investment Requirements', aiMatches:'AI Matches', projects:'Projects', payments:'Payments', users:'Users', assets:'Assets', reports:'Reports', commissions:'Commissions' },
    hero: { tagline:'Put Your Unused Asset to Work', taglineSub:'A Saudi platform connecting retired asset owners with suitable operators', ctaOwner:'Invest My Asset', ctaInvestor:'Find an Asset to Operate', ctaLearnMore:'Learn More' },
    problem: { title:'The Problem AAYED Solves', ownerTitle:'The Retired Asset Owner', ownerDesc:'Owns an unused asset — a farm, land, property, or shop — but does not want to be involved in daily business operations.', investorTitle:'The Operator', investorDesc:'Has a project idea, capital, and expertise but needs the right asset in the right location.', gapTitle:'The Gap', gapDesc:'AAYED bridges the gap between a retired individual with an unused asset and an operator who needs the right asset.' },
    forWhom: { title:'Who Is AAYED For?', ownerTitle:'Retired Asset Owner', ownerPoints:['Owns an unused or underutilized asset','Wants financial returns without daily management','Retains full ownership of the asset','Wants to review operators and compare offers'], investorTitle:'Operator', investorPoints:['Has a project idea or operational experience','Needs a suitable asset with specific requirements','Wants to find the right asset faster','Wants to submit a clear operation offer'] },
    valueProposition: { title:"AAYED's Value Proposition", coreValue:'AAYED does more than display properties — it connects the right asset with the right operator.', ownerValue:'Benefit from your unused asset without operating the business yourself.', investorValue:'Find the right asset for your project faster through intelligent matching.' },
    howItWorks: { title:'How AAYED Works', subtitle:'The Abu Fahad & Khalid Scenario', ownershipNote:'The asset is NEVER sold — ownership always stays with the owner', steps:[ {t:'Abu Fahad Adds His Farm',d:'Abu Fahad registered on AAYED and added his farm in Riyadh with details and facilities.'},{t:'Admin Reviews & Approves',d:'An AAYED admin reviewed the farm data and approved it for listing.'},{t:'Khalid Enters His Requirements',d:'Khalid registered and entered his project requirements: a seasonal outdoor lounge in Riyadh.'},{t:'AI Analyzes & Matches',d:"AAYED's AI analyzed the requirements and compared them against available assets."},{t:"Abu Fahad's Farm — 92% Match",d:'The AI recommended Abu Fahad\'s Farm as the best match with 4 clear reasons.'},{t:'Khalid Submits an Offer',d:'Khalid reviewed the farm details and submitted his investment offer.'},{t:'Abu Fahad Reviews & Accepts',d:'Abu Fahad received the offer, reviewed it, and accepted.'},{t:'Agreement & Project Activation',d:"Both parties signed the agreement including AAYED's 2.5% commission."},{t:'Abu Fahad Monitors His Returns',d:'Abu Fahad tracks his returns through AAYED without any involvement in daily operations.',note:'Asset NEVER sold'} ] },
    market: { title:'Market Opportunity', subtitle:'Market Opportunity | فرصة السوق', disclaimer:'Note: The figures below represent the broader Saudi market ecosystem, not AAYED\'s confirmed customer base.', targetNote:"AAYED's target segment is a subset of this market — retired individuals with unused assets, and operators seeking suitable assets.", q5q7Note:'Academic note: Questions about whether customers want the solution are hypotheses requiring validation with real users.', source:'Source' },
    competitors: { title:'Current Alternatives', subtitle:'Current Alternatives | الحلول الحالية', currentJourneyTitle:"The Customer's Current Journey — Fragmented", ownerJourney:"Today's Asset Owner Journey", investorJourney:"Today's Operator Journey", aayedJourney:'The AAYED Journey — Integrated in One Platform', comparisonTitle:'AAYED vs Existing Alternatives', differentiationTitle:'Why AAYED Is Different', differentiationDesc:"AAYED is not another property marketplace. Its core mission is finding the right operator for an underutilized asset." },
    general: { welcomeTitle:'Welcome to AAYED', welcomeDesc:'Choose your journey to get started', ownerCardTitle:'Invest My Asset', ownerCardDesc:'If you are retired and own an unused asset — a farm, land, property, or shop — and want financial returns without daily management.', ownerCardCta:'Start as Asset Owner', investorCardTitle:'Find an Asset to Operate', investorCardDesc:'If you are an operator or entrepreneur with a project idea and need the right asset in the right location.', investorCardCta:'Start as Operator' },
    auth: { loginTitle:'Login', registerTitle:'Create a New Account', fullName:'Full Name', email:'Email', phone:'Phone Number', password:'Password', confirmPassword:'Confirm Password', loginBtn:'Login', registerBtn:'Create Account', noAccount:"Don't have an account?", hasAccount:'Already have an account?', registerLink:'Register Now', loginLink:'Login', adminTitle:'Admin Login', adminBtn:'Admin Login', demoHint:'Prototype — any credentials work', demoAccounts:'Demo accounts' },
    onboarding: { ownerTitle:'Asset Owner Onboarding', investorTitle:'Operator Onboarding', retiredConfirm:'I confirm that I am retired and own an asset I wish to invest', investorConfirm:'I confirm that I am an operator or entrepreneur looking for a suitable asset', commissionNote:"AAYED charges a 2.5% platform commission on the agreement value.", ownershipNote:'The asset is never sold. Full ownership remains with the asset owner at all times.', ownerSteps:[{t:'Who Are You?',d:'Confirm your identity as a retired asset owner'},{t:'About Your Asset',d:'Basic information about the asset'},{t:'Your Goals',d:'What you want from this experience'},{t:'Platform Terms',d:"Review AAYED's terms and 2.5% commission"},{t:'Confirmation',d:'Review and confirm your information'}], investorSteps:[{t:'Who Are You?',d:'Confirm your identity as an operator or entrepreneur'},{t:'Your Project Idea',d:'Type of project and business activity'},{t:'Experience & Capability',d:'Your operational experience and financial capability'},{t:'Platform Terms',d:"Review AAYED's terms and 2.5% commission"},{t:'Confirmation',d:'Review and confirm your information'}] },
    asset: { addTitle:'Add New Asset', nameLabel:'Asset Name', typeLabel:'Asset Type', types:{farm:'Farm',land:'Land',property:'Property / Building',shop:'Commercial Shop',floor:'Floor',space:'Space'}, locationLabel:'Location', regionLabel:'Region', cityLabel:'City', districtLabel:'District', sizeLabel:'Size (sqm)', conditionLabel:'Asset Condition', conditions:{excellent:'Excellent',good:'Good',fair:'Fair'}, facilitiesLabel:'Available Facilities', facilities:{water:'Water',electricity:'Electricity',storage:'Storage',parking:'Parking',restrooms:'Restrooms',kitchen:'Kitchen'}, allowedActivitiesLabel:'Allowed Activities', restrictionsLabel:'Restrictions & Owner Notes', descriptionLabel:'Asset Description', expectedReturnLabel:'Expected Return Type', returnTypes:{fixed:'Fixed Rent',share:'Revenue Share',both:'Mixed'}, photosHint:'Add photos to increase asset attractiveness (prototype mock)', submitAsset:'Submit Asset for Review', statuses:{draft:'Draft',under_review:'Under Review',approved:'Approved',active:'Active',rejected:'Rejected',changes_requested:'Changes Requested',matched:'Matched'} },
    match: { aiTitle:'AI Matching Results', matchPercent:'Match', reasons:'Match Reasons', defaultReasons:['Location matches requirement','Required size is available','Proposed activity is allowed','Required facilities are available'], viewAsset:'View Asset Details', submitOffer:'Submit Investment Offer', noMatches:'No matches found — try again later' },
    offer: { submitTitle:'Submit Operation Offer', projectDescLabel:'Project Description & Operations Plan', periodLabel:'Proposed Operation Period', financialLabel:'Financial Offer', revenueShare:'Revenue Share', fixedRent:'Fixed Rent', percentageLabel:'Percentage (%)', amountLabel:'Amount (SAR)', meetRequirementsLabel:'How do you meet the asset requirements?', reviewSubmit:'Review & Submit Offer', statuses:{pending:'Pending',accepted:'Accepted',rejected:'Rejected'}, acceptOffer:'Accept Offer', rejectOffer:'Reject Offer', viewOffer:'View Details', compareTitle:'Compare Offers', investorLabel:'Operator', periodTitle:'Period', financialTitle:'Financial Offer' },
    agreement: { title:'Agreement', partiesTitle:'Parties', ownerParty:'Asset Owner (Landlord)', investorParty:'Operator', assetTitle:'Asset Subject of Agreement', periodTitle:'Agreement Period', financialTitle:'Financial Arrangement', commissionTitle:'AAYED Platform Commission', commissionNote:'2.5% of the agreement value — automatically deducted from each payment', ownershipClause:'Ownership Clause: The asset owner retains full ownership throughout and after the agreement period.', responsibilitiesTitle:"Parties' Responsibilities", ownerResp:'Asset Owner Obligations', investorResp:'Operator Obligations', statuses:{pending:'Awaiting Signature',active:'Active',completed:'Completed'}, viewAgreement:'View Agreement', mockNote:'This is a prototype agreement for academic demonstration purposes only' },
    returns: { title:'Returns & Payments', totalExpected:'Total Expected Returns', totalReceived:'Total Received', nextPayment:'Next Payment', commissionDeducted:'Commission Deducted (2.5%)', period:'Period', amount:'Amount', status:'Status', statuses:{paid:'Paid',pending:'Pending',upcoming:'Upcoming'}, chartTitle:'Returns Over Time' },
    admin: { dashboardTitle:'Admin Dashboard', totalUsers:'Total Users', totalAssets:'Total Assets', underReview:'Under Review', activeAgreements:'Active Agreements', activeProjects:'Active Projects', totalCommissions:'Total Commissions', approve:'Approve', reject:'Reject', requestChanges:'Request Changes' },
    common: { save:'Save', cancel:'Cancel', close:'Close', confirm:'Confirm', edit:'Edit', view:'View', back:'Back', next:'Next', submit:'Submit', loading:'Loading...', noData:'No data available', riyal:'SAR', sqm:'sqm', years:'years', year:'year', months:'months', month:'month', platform:'AAYED | عائد', tagline:'Connecting Assets with Investors', copyright:'© 2024 AAYED — Academic Prototype', prototype:'Academic Prototype' },
  }
};

function t(path) {
  const keys = path.split('.');
  let obj = I18N[State.lang];
  for (const k of keys) { obj = obj?.[k]; }
  return obj ?? path;
}

/* ── Mock Data ───────────────────────────────────────────── */
const DEMO_USERS = {
  'abufahad@demo.com': { id:'u1', nameAr:'أبو فهد', nameEn:'Abu Fahad', role:'owner', email:'abufahad@demo.com' },
  'khalid@demo.com':   { id:'u2', nameAr:'خالد العمري', nameEn:'Khalid Al-Omari', role:'investor', email:'khalid@demo.com' },
  'admin@aayed.sa':    { id:'u3', nameAr:'مشرف عائد', nameEn:'AAYED Admin', role:'admin', email:'admin@aayed.sa' },
};

const DB = {
  assets: [
    { id:'a1', nameAr:'مزرعة أبو فهد', nameEn:"Abu Fahad's Farm", type:'farm', regionAr:'الرياض', regionEn:'Riyadh', cityAr:'الرياض', cityEn:'Riyadh', districtAr:'شمال الرياض', districtEn:'North Riyadh', size:5000, condition:'good', facilities:['water','electricity','storage','parking','restrooms'], allowedActivitiesAr:['صالون خارجي','زراعة','فعاليات','تخييم'], allowedActivitiesEn:['Outdoor lounge','Agriculture','Events','Camping'], restrictionsAr:'لا يسمح بالأنشطة الصاخبة بعد منتصف الليل', restrictionsEn:'No loud activities after midnight', descriptionAr:'مزرعة واسعة في شمال الرياض مجهزة بكامل المرافق.', descriptionEn:'A spacious farm in North Riyadh fully equipped with utilities.', expectedReturn:'share', status:'approved', ownerId:'u1', createdAt:'2024-01-15' },
    { id:'a2', nameAr:'محل تجاري في العليا', nameEn:'Al-Olaya Commercial Shop', type:'shop', regionAr:'الرياض', regionEn:'Riyadh', cityAr:'الرياض', cityEn:'Riyadh', districtAr:'العليا', districtEn:'Al-Olaya', size:120, condition:'excellent', facilities:['electricity','restrooms','parking'], allowedActivitiesAr:['تجزئة','مقهى','خدمات'], allowedActivitiesEn:['Retail','Café','Services'], restrictionsAr:'لا يسمح بالمطاعم ذات الروائح النفاذة', restrictionsEn:'No restaurants with strong odors', descriptionAr:'محل تجاري في موقع مميز بحي العليا.', descriptionEn:'Commercial shop in a prime location in Al-Olaya.', expectedReturn:'fixed', status:'under_review', ownerId:'u1', createdAt:'2024-03-01' },
  ],
  offers: [
    { id:'o1', assetId:'a1', investorId:'u2', investorNameAr:'خالد العمري', investorNameEn:'Khalid Al-Omari', projectTypeAr:'صالون خارجي موسمي', projectTypeEn:'Seasonal Outdoor Lounge', projectDescAr:'إنشاء صالون خارجي موسمي يستهدف العائلات والشباب خلال فصل الربيع والخريف.', projectDescEn:'A seasonal outdoor lounge targeting families and youth during spring and autumn.', period:'2', periodUnit:'years', financialType:'share', financialValue:30, financialNote:'30% من صافي الأرباح / 30% of net profits', meetRequirementsAr:'المزرعة تلبي جميع متطلباتنا: الموقع والمساحة والمرافق.', meetRequirementsEn:'The farm meets all our requirements: location, space, and facilities.', status:'pending', submittedAt:'2024-04-10' },
    { id:'o2', assetId:'a1', investorId:'u_other', investorNameAr:'سعد المطيري', investorNameEn:'Saad Al-Mutairi', projectTypeAr:'مخيم تراثي', projectTypeEn:'Heritage Camping Site', projectDescAr:'تحويل المزرعة إلى مخيم تراثي سعودي يقدم تجربة أصيلة للعائلات.', projectDescEn:'Transform the farm into a Saudi heritage camping site.', period:'3', periodUnit:'years', financialType:'fixed', financialValue:80000, financialNote:'80,000 ريال سنوياً / 80,000 SAR annually', meetRequirementsAr:'المزرعة مثالية للمخيمات التراثية بمساحتها وموقعها.', meetRequirementsEn:'The farm is ideal for heritage camping with its size and location.', status:'pending', submittedAt:'2024-04-12' },
  ],
  agreements: [
    { id:'ag1', assetId:'a1', assetNameAr:'مزرعة أبو فهد', assetNameEn:"Abu Fahad's Farm", ownerId:'u1', ownerNameAr:'أبو فهد', ownerNameEn:'Abu Fahad', investorId:'u2', investorNameAr:'خالد العمري', investorNameEn:'Khalid Al-Omari', offerId:'o1', projectTypeAr:'صالون خارجي موسمي', projectTypeEn:'Seasonal Outdoor Lounge', startDate:'2024-05-01', endDate:'2026-05-01', periodYears:2, financialType:'share', financialValue:30, financialDescAr:'30% من صافي الأرباح الشهرية', financialDescEn:'30% of monthly net profits', commissionRate:2.5, ownerResp:{ar:['السماح للمستثمر بالوصول','الحفاظ على البنية التحتية','عدم التدخل في العمليات'],en:['Allow investor access','Maintain basic infrastructure','Non-interference in operations']}, investorResp:{ar:['تشغيل المشروع وفق الاتفاقية','الحفاظ على الأصل وإعادته بحالة جيدة','دفع الحصة في مواعيدها'],en:['Operate per the agreement','Maintain and return the asset in good condition','Pay the agreed share on time']}, status:'active', signedAt:'2024-04-20' },
  ],
  projects: [
    { id:'p1', agreementId:'ag1', assetId:'a1', assetNameAr:'مزرعة أبو فهد', assetNameEn:"Abu Fahad's Farm", ownerId:'u1', ownerNameAr:'أبو فهد', ownerNameEn:'Abu Fahad', investorId:'u2', investorNameAr:'خالد العمري', investorNameEn:'Khalid Al-Omari', projectTypeAr:'صالون خارجي موسمي', projectTypeEn:'Seasonal Outdoor Lounge', startDate:'2024-05-01', endDate:'2026-05-01', status:'active', progressPercent:35 },
  ],
  payments: [
    { id:'pay1', projectId:'p1', period:'مايو 2024 / May 2024', grossAmount:45000, commissionAmount:1125, netToOwner:13350, status:'paid', dueDate:'2024-05-31' },
    { id:'pay2', projectId:'p1', period:'يونيو 2024 / Jun 2024', grossAmount:52000, commissionAmount:1300, netToOwner:15450, status:'paid', dueDate:'2024-06-30' },
    { id:'pay3', projectId:'p1', period:'يوليو 2024 / Jul 2024', grossAmount:61000, commissionAmount:1525, netToOwner:18225, status:'paid', dueDate:'2024-07-31' },
    { id:'pay4', projectId:'p1', period:'أغسطس 2024 / Aug 2024', grossAmount:58000, commissionAmount:1450, netToOwner:17250, status:'pending', dueDate:'2024-08-31' },
    { id:'pay5', projectId:'p1', period:'سبتمبر 2024 / Sep 2024', grossAmount:null, commissionAmount:null, netToOwner:null, status:'upcoming', dueDate:'2024-09-30' },
  ],
  investorPayments: [
    { id:'ip1', projectId:'p1', period:'مايو 2024 / May 2024', revenue:45000, sharePercent:30, shareDue:13500, commission:1125, netPaid:14625, status:'paid', dueDate:'2024-05-31' },
    { id:'ip2', projectId:'p1', period:'يونيو 2024 / Jun 2024', revenue:52000, sharePercent:30, shareDue:15600, commission:1300, netPaid:16900, status:'paid', dueDate:'2024-06-30' },
    { id:'ip3', projectId:'p1', period:'يوليو 2024 / Jul 2024', revenue:61000, sharePercent:30, shareDue:18300, commission:1525, netPaid:19825, status:'paid', dueDate:'2024-07-31' },
    { id:'ip4', projectId:'p1', period:'أغسطس 2024 / Aug 2024', revenue:58000, sharePercent:30, shareDue:17400, commission:1450, netPaid:18850, status:'pending', dueDate:'2024-08-31' },
  ],
  notifications: {
    u1: [
      { id:'n1', titleAr:'تمت الموافقة على مزرعتك', titleEn:'Your farm has been approved', descAr:'وافق المشرف على مزرعة أبو فهد وهي الآن مرئية للمستثمرين.', descEn:"Admin approved Abu Fahad's Farm — now visible to investors.", read:false, createdAt:'2024-04-01' },
      { id:'n2', titleAr:'عرض استثماري جديد', titleEn:'New Investment Offer', descAr:'تلقيت عرضاً من خالد العمري على مزرعتك.', descEn:'You received an offer from Khalid Al-Omari.', read:false, createdAt:'2024-04-10' },
      { id:'n3', titleAr:'عرض ثانٍ واردة', titleEn:'Second Offer Received', descAr:'تلقيت عرضاً من سعد المطيري على مزرعتك.', descEn:'You received an offer from Saad Al-Mutairi.', read:true, createdAt:'2024-04-12' },
    ],
    u2: [
      { id:'n5', titleAr:'نتائج المطابقة جاهزة', titleEn:'Matching Results Ready', descAr:'وجد الذكاء الاصطناعي 3 أصول تطابق متطلباتك.', descEn:'AI found 3 assets matching your requirements.', read:false, createdAt:'2024-04-05' },
      { id:'n6', titleAr:'تم قبول عرضك', titleEn:'Your Offer Was Accepted', descAr:'قبل أبو فهد عرضك الاستثماري على مزرعته.', descEn:'Abu Fahad accepted your investment offer.', read:false, createdAt:'2024-04-15' },
    ],
  },
  marketStats: [
    { id:'s1', labelAr:'المتقاعدون / المستفيدون من التقاعد', labelEn:'Retirees / Pension Beneficiaries', value:'TBD', sourceAr:'المصدر المقترح: التأمينات الاجتماعية (GOSI)', sourceEn:'Suggested source: GOSI' },
    { id:'s2', labelAr:'السجلات التجارية النشطة', labelEn:'Active Commercial Registrations', value:'TBD', sourceAr:'المصدر المقترح: وزارة التجارة', sourceEn:'Suggested source: Ministry of Commerce' },
    { id:'s3', labelAr:'فرص الاستثمار المتاحة', labelEn:'Available Investment Opportunities', value:'TBD', sourceAr:'المصدر المقترح: Invest Saudi', sourceEn:'Suggested source: Invest Saudi' },
    { id:'s4', labelAr:'حجم السوق العقاري السعودي', labelEn:'Saudi Real Estate Market Size', value:'TBD', sourceAr:'المصدر المقترح: الهيئة الوطنية للإسكان', sourceEn:'Suggested source: NHC / SAMA' },
  ],
  competitors: [
    { name:'AAYED | عائد', focusAr:'ربط أصول المتقاعدين بالمستثمرين عبر مطابقة ذكية', focusEn:'Connecting retiree assets with investors via AI matching', focusRetired:true, noSale:true, ownerRetention:true, investorModel:true, aiMatching:true, matchExplanation:true, offerWorkflow:true, agreementWorkflow:true, returnTracking:true, arabicUX:true, highlight:true },
    { name:'Ejar | إيجار', focusAr:'إدارة عقود الإيجار', focusEn:'Rental contract management', focusRetired:false, noSale:true, ownerRetention:true, investorModel:false, aiMatching:false, matchExplanation:false, offerWorkflow:false, agreementWorkflow:'partial', returnTracking:false, arabicUX:true, highlight:false },
    { name:'Furas | فرص', focusAr:'عرض فرص الاستثمار', focusEn:'Investment opportunity listings', focusRetired:false, noSale:false, ownerRetention:false, investorModel:false, aiMatching:false, matchExplanation:false, offerWorkflow:false, agreementWorkflow:false, returnTracking:false, arabicUX:true, highlight:false },
    { name:'Wasalt | وصلت', focusAr:'قوائم العقارات', focusEn:'Property listings', focusRetired:false, noSale:true, ownerRetention:true, investorModel:false, aiMatching:false, matchExplanation:false, offerWorkflow:false, agreementWorkflow:false, returnTracking:false, arabicUX:true, highlight:false },
    { name:'Traditional Brokers', focusAr:'سمسرة عقارية تقليدية', focusEn:'Traditional brokerage', focusRetired:false, noSale:true, ownerRetention:true, investorModel:false, aiMatching:false, matchExplanation:false, offerWorkflow:false, agreementWorkflow:false, returnTracking:false, arabicUX:true, highlight:false },
  ],
  // Runtime offer-status overrides (simulate accept/reject without a backend)
  offerStatusOverrides: {},
};

/* ── Auth helpers ────────────────────────────────────────── */
function doLogin(email, _pw, asAdmin = false) {
  if (asAdmin || email === 'admin@aayed.sa') { State.setUser(DEMO_USERS['admin@aayed.sa']); return true; }
  if (DEMO_USERS[email]) { State.setUser(DEMO_USERS[email]); return true; }
  State.setUser({ id:'u_new_'+Date.now(), nameAr:email.split('@')[0], nameEn:email.split('@')[0], role:'general', email });
  return true;
}
function doRegister(data) {
  State.setUser({ id:'u_new_'+Date.now(), nameAr:data.name, nameEn:data.name, role:'general', email:data.email });
  return true;
}
function upgradeRole(role) {
  if (State.user) State.setUser({ ...State.user, role });
}

/* ── Shared UI builders ──────────────────────────────────── */

function userName() {
  const u = State.user;
  return u ? (State.lang === 'ar' ? u.nameAr : u.nameEn) : '';
}

function getDashboardLink() {
  const u = State.user;
  if (!u) return 'login.html';
  if (u.role === 'owner')    return 'owner-dashboard.html';
  if (u.role === 'investor') return 'investor-dashboard.html';
  if (u.role === 'admin')    return 'admin-dashboard.html';
  return 'general-home.html';
}

function buildNavbar({ publicLinks = false } = {}) {
  const u = State.user;
  const unread = u ? (DB.notifications[u.id] || []).filter(n => !n.read).length : 0;
  return `
<nav class="navbar">
  <div class="navbar-inner">
    <a href="index.html" class="logo">
      <div class="logo-icon" style="background:transparent;padding:0;overflow:visible;width:2.4rem;height:1.6rem">${LOGO_SVG}</div>
      <span class="logo-text">${State.lang === 'ar' ? 'عائد' : 'AAYED'}</span>
      <span style="color:var(--gray-300);margin:0 .25rem">|</span>
      <span style="color:var(--gray-400);font-size:.8rem">${State.lang === 'ar' ? 'AAYED' : 'عائد'}</span>
    </a>
    ${publicLinks && !u ? `<div class="nav-links" id="nav-pub-links">
      <a href="how-it-works.html" class="nav-link">${t('nav.howItWorks')}</a>
      <a href="market-opportunity.html" class="nav-link">${t('nav.marketOpportunity')}</a>
      <a href="competitors.html" class="nav-link">${t('nav.competitors')}</a>
    </div>` : ''}
    <div class="nav-right">
      <button class="lang-btn" onclick="State.toggleLang();location.reload()">${State.lang === 'ar' ? 'English' : 'العربية'}</button>
      ${u ? `
        <div class="relative" style="display:inline-flex;align-items:center">
          <button style="position:relative;padding:.5rem;color:var(--gray-500);background:none;border:none;cursor:pointer" onclick="toggleNotifPanel()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            ${unread > 0 ? `<span class="notif-badge">${unread}</span>` : ''}
          </button>
        </div>
        <div class="user-menu-wrap">
          <button class="user-btn" onclick="toggleUserMenu()">
            <div class="user-avatar">${userName().charAt(0)}</div>
            <span style="font-size:.875rem;color:var(--gray-700);max-width:7rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${userName()}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="user-dropdown hidden" id="user-dropdown">
            <a href="${getDashboardLink()}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              ${t('nav.dashboard')}
            </a>
            <hr class="hr">
            <button class="danger" onclick="State.logout();location.href='index.html'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              ${t('nav.logout')}
            </button>
          </div>
        </div>
      ` : `
        <a href="login.html" class="nav-link" style="display:none" id="nav-login-link">${t('nav.login')}</a>
        <a href="register.html" class="btn btn-primary btn-sm">${t('nav.register')}</a>
      `}
    </div>
  </div>
</nav>`;
}

function buildFooter() {
  return `
<footer class="footer">
  <div class="footer-grid">
    <div>
      <div class="logo mb-3">
        <div class="logo-icon" style="background:transparent;padding:0;overflow:visible;width:2.4rem;height:1.6rem;filter:brightness(0) invert(1)">${LOGO_SVG}</div>
        <span class="logo-text" style="color:#fff">عائد | AAYED</span>
      </div>
      <p style="font-size:.875rem;line-height:1.7">${t('common.tagline')}</p>
      <p style="font-size:.75rem;color:var(--gray-600);margin-top:.5rem">${t('common.prototype')}</p>
    </div>
    <div>
      <h4 style="color:#fff;font-weight:500;font-size:.875rem;margin-bottom:.75rem">${t('nav.howItWorks')}</h4>
      <ul style="list-style:none;space-y:.5rem;font-size:.875rem">
        <li style="margin-bottom:.5rem"><a href="how-it-works.html" style="color:var(--gray-400)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--gray-400)'">${t('nav.howItWorks')}</a></li>
        <li style="margin-bottom:.5rem"><a href="market-opportunity.html" style="color:var(--gray-400)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--gray-400)'">${t('nav.marketOpportunity')}</a></li>
        <li><a href="competitors.html" style="color:var(--gray-400)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--gray-400)'">${t('nav.competitors')}</a></li>
      </ul>
    </div>
    <div>
      <h4 style="color:#fff;font-weight:500;font-size:.875rem;margin-bottom:.75rem">${t('nav.register')}</h4>
      <ul style="list-style:none;font-size:.875rem">
        <li style="margin-bottom:.5rem"><a href="register.html" style="color:var(--gray-400)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--gray-400)'">${t('nav.register')}</a></li>
        <li><a href="login.html" style="color:var(--gray-400)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--gray-400)'">${t('nav.login')}</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-copy">${t('common.copyright')}</div>
</footer>`;
}

function buildSidebar(role, activePath) {
  const ownerLinks = [
    { href:'owner-dashboard.html', label:t('nav.dashboard'), icon:'grid' },
    { href:'owner-assets.html', label:t('nav.myAssets'), icon:'package' },
    { href:'add-asset.html', label:t('nav.addAsset'), icon:'plus-circle' },
    { href:'owner-matches.html', label:t('nav.matches'), icon:'zap' },
    { href:'owner-offers.html', label:t('nav.receivedOffers'), icon:'inbox' },
    { href:'compare-offers.html', label:t('nav.compareOffers'), icon:'columns' },
    { href:'owner-agreements.html', label:t('nav.agreements'), icon:'file-text' },
    { href:'active-projects.html', label:t('nav.activeProjects'), icon:'rocket' },
    { href:'returns.html', label:t('nav.returns'), icon:'trending-up' },
  ];
  const investorLinks = [
    { href:'investor-dashboard.html', label:t('nav.dashboard'), icon:'grid' },
    { href:'investor-requirements.html', label:t('nav.requirements'), icon:'search' },
    { href:'ai-matches.html', label:t('nav.aiMatches'), icon:'cpu' },
    { href:'investor-agreements.html', label:t('nav.agreements'), icon:'file-text' },
    { href:'investor-projects.html', label:t('nav.projects'), icon:'rocket' },
    { href:'investor-payments.html', label:t('nav.payments'), icon:'credit-card' },
  ];
  const adminLinks = [
    { href:'admin-dashboard.html', label:t('nav.dashboard'), icon:'grid' },
    { href:'admin-users.html', label:t('nav.users'), icon:'users' },
    { href:'admin-assets.html', label:t('nav.assets'), icon:'check-square' },
    { href:'admin-agreements.html', label:t('nav.agreements'), icon:'file-text' },
    { href:'admin-projects.html', label:t('nav.activeProjects'), icon:'rocket' },
    { href:'admin-reports.html', label:t('nav.reports'), icon:'bar-chart-2' },
    { href:'admin-commissions.html', label:t('nav.commissions'), icon:'dollar-sign' },
  ];
  const links = role === 'owner' ? ownerLinks : role === 'investor' ? investorLinks : adminLinks;
  const roleLabel = role === 'owner' ? (State.lang==='ar'?'صاحب الأصل':'Asset Owner') : role === 'investor' ? (State.lang==='ar'?'مشغّل':'Operator') : (State.lang==='ar'?'مشرف النظام':'System Admin');
  const roleClass = role === 'owner' ? 'sidebar-role-owner' : role === 'investor' ? 'sidebar-role-investor' : 'sidebar-role-admin';

  return `
<aside class="sidebar">
  <div class="sidebar-head">
    <a href="index.html" class="logo" style="text-decoration:none">
      <div style="width:2rem;height:1.35rem;flex-shrink:0;overflow:visible">${LOGO_SVG}</div>
      <span style="font-weight:800;font-size:.95rem;color:var(--gray-900)">عائد | AAYED</span>
    </a>
    <div class="sidebar-role ${roleClass}">${roleLabel}</div>
  </div>
  <nav class="sidebar-nav">
    ${links.map(l => `<a href="${l.href}" class="nav-item${activePath && activePath === l.href ? ' active' : ''}">${svgIcon(l.icon, 16)} ${l.label}</a>`).join('')}
  </nav>
</aside>`;
}

/* minimal inline SVG icons */
function svgIcon(name, size=16) {
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const icons = {
    grid: `<svg ${s}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    package: `<svg ${s}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    'plus-circle': `<svg ${s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    zap: `<svg ${s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    inbox: `<svg ${s}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
    columns: `<svg ${s}><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/></svg>`,
    'file-text': `<svg ${s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    rocket: `<svg ${s}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    'trending-up': `<svg ${s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    search: `<svg ${s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    cpu: `<svg ${s}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    'credit-card': `<svg ${s}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    users: `<svg ${s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    'check-square': `<svg ${s}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    'bar-chart-2': `<svg ${s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    'dollar-sign': `<svg ${s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    'check-circle': `<svg ${s}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    shield: `<svg ${s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    bell: `<svg ${s}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    x: `<svg ${s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    'arrow-right': `<svg ${s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    'arrow-left': `<svg ${s}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    building: `<svg ${s}><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="7" x2="9" y2="7"/><line x1="4" y1="12" x2="9" y2="12"/><line x1="4" y1="17" x2="9" y2="17"/><line x1="15" y1="7" x2="20" y2="7"/><line x1="15" y1="12" x2="20" y2="12"/><line x1="15" y1="17" x2="20" y2="17"/></svg>`,
    calendar: `<svg ${s}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    'map-pin': `<svg ${s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    maximize: `<svg ${s}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
    'alert-circle': `<svg ${s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    lock: `<svg ${s}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    user: `<svg ${s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  };
  return icons[name] || '';
}

/* badge helper */
function badge(label, color='gray') {
  return `<span class="badge badge-${color}">${label}</span>`;
}

/* asset status badge */
function assetStatusBadge(status) {
  const map = { draft:'gray', under_review:'orange', approved:'blue', active:'emerald', rejected:'red', changes_requested:'orange', matched:'purple' };
  return badge(t(`asset.statuses.${status}`) || status, map[status] || 'gray');
}

/* ── Modal helper ────────────────────────────────────────── */
function showModal(titleHtml, bodyHtml, footerHtml='') {
  let el = document.getElementById('global-modal');
  if (!el) {
    el = document.createElement('div');
    el.id = 'global-modal';
    document.body.appendChild(el);
  }
  el.innerHTML = `
    <div class="modal-backdrop" onclick="if(event.target===this)closeModal()">
      <div class="modal-box">
        <div class="modal-head">
          <span class="modal-title">${titleHtml}</span>
          <button class="modal-close" onclick="closeModal()">${svgIcon('x',18)}</button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
        ${footerHtml ? `<div class="modal-foot">${footerHtml}</div>` : ''}
      </div>
    </div>`;
}
function closeModal() {
  const el = document.getElementById('global-modal');
  if (el) el.innerHTML = '';
}

/* ── Nav dropdown toggles ────────────────────────────────── */
function toggleUserMenu() {
  const d = document.getElementById('user-dropdown');
  if (d) d.classList.toggle('hidden');
}
function toggleNotifPanel() {
  const u = State.user;
  if (!u) return;
  const notifs = DB.notifications[u.id] || [];
  const body = notifs.length === 0
    ? `<p style="color:var(--gray-400);text-align:center;padding:2rem">${t('common.noData')}</p>`
    : `<ul style="list-style:none" class="space-y-3">${notifs.map(n=>`
        <li style="display:flex;gap:.75rem;align-items:flex-start">
          ${!n.read ? `<span style="width:.6rem;height:.6rem;background:var(--emerald-500);border-radius:50%;margin-top:.4rem;flex-shrink:0"></span>` : `<span style="width:.6rem;height:.6rem;background:transparent;flex-shrink:0;margin-top:.4rem"></span>`}
          <div>
            <div style="font-size:.875rem;font-weight:600;color:var(--gray-900)">${State.lang==='ar'?n.titleAr:n.titleEn}</div>
            <div style="font-size:.8rem;color:var(--gray-500);margin-top:.15rem">${State.lang==='ar'?n.descAr:n.descEn}</div>
          </div>
        </li>`).join('')}</ul>`;
  showModal(t('nav.notifications'), body, `<button class="btn btn-outline btn-sm" onclick="closeModal()">${t('common.close')}</button>`);
}

/* close dropdown on outside click */
document.addEventListener('click', e => {
  const wrap = document.querySelector('.user-menu-wrap');
  const dd = document.getElementById('user-dropdown');
  if (dd && wrap && !wrap.contains(e.target)) dd.classList.add('hidden');
});

/* ── Redirect guards (call at top of each protected page) ── */
function requireAuth(allowedRoles) {
  const u = State.user;
  if (!u) { location.href = 'login.html'; return false; }
  if (allowedRoles && !allowedRoles.includes(u.role)) {
    location.href = getDashboardLink(); return false;
  }
  return true;
}
