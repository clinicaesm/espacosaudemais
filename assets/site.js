(function(){
  // ================= PRELOADER =================
  window.addEventListener('load', function(){
    setTimeout(function(){ document.querySelector('.preloader').classList.add('done'); }, 250);
  });

  // ================= SCROLL PROGRESS + HEADER + BACK-TO-TOP =================
  var progress = document.querySelector('.scroll-progress');
  var header = document.querySelector('.site-header');
  var backToTop = document.querySelector('.back-to-top');
  function updateScrollState(){
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    header.classList.toggle('scrolled', h.scrollTop > 30);
    backToTop.classList.toggle('show', h.scrollTop > 700);
  }
  window.addEventListener('scroll', updateScrollState, {passive:true});
  updateScrollState(); // corre logo ao carregar — cobre o caso de a página abrir já com scroll (ex: link direto para uma secção)
  backToTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  // ================= MOBILE MENU =================
  var menuBtn = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  menuBtn.addEventListener('click', function(){
    var open = mobileNav.classList.toggle('open');
    menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mobile-nav a, .mobile-nav button').forEach(function(el){
    el.addEventListener('click', function(){ mobileNav.classList.remove('open'); menuBtn.classList.remove('active'); });
  });

  // ================= NAVEGAÇÃO INTERNA (scroll suave por botão, sem depender de âncoras <a>) =================
  document.querySelectorAll('[data-scroll-to]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = document.getElementById(btn.dataset.scrollTo);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // ================= DADOS: CLÍNICAS =================
  var CLINICS = {
    praia: {
      name:'Praia', island:'Santiago',
      address:'Av. Amílcar Cabral, r/c 13A, Plateau, Praia',
      phone:'263 80 90', phoneHref:'tel:+2382638090',
      mobile:'988 86 86', mobileHref:'tel:+2389888686',
      whatsapp:'https://wa.me/2389888686?text=Ol%C3%A1%21%20Gostaria%20de%20marcar%20uma%20consulta%20na%20Cl%C3%ADnica%20Espa%C3%A7o%20Sa%C3%BAde%2B%20%28Praia%29.',
      maps:'https://www.google.com/maps/search/?api=1&query=Av.%20Am%C3%ADlcar%20Cabral%2C%20r/c%2013A%2C%20Plateau%2C%20Praia%2C%20Cabo%20Verde'
    },
    mindelo: {
      name:'Mindelo', island:'São Vicente',
      address:'Av. Marginal, Edifício Baía, Mindelo, São Vicente',
      phone:'231 67 00', phoneHref:'tel:+2382316700',
      mobile:'995 96 67', mobileHref:'tel:+2389959667',
      whatsapp:'https://wa.me/2389959667?text=Ol%C3%A1%21%20Gostaria%20de%20marcar%20uma%20consulta%20na%20Cl%C3%ADnica%20Espa%C3%A7o%20Sa%C3%BAde%2B%20%28Mindelo%29.',
      maps:'https://www.google.com/maps/search/?api=1&query=Av.%20Marginal%2C%20Edif%C3%ADcio%20Ba%C3%ADa%2C%20Mindelo%2C%20S%C3%A3o%20Vicente%2C%20Cabo%20Verde'
    }
  };

  // ================= DADOS: ESPECIALIDADES (de dados-especialidades.json) =================
  var SPECIALTIES = {
    oftalmologia: {
      name:'Oftalmologia', order:'01', locations:['praia','mindelo'], locLabel:'Ambas',
      desc:'Cuidados completos da visão, do diagnóstico ao acompanhamento.',
      photo:'assets/specialties/oftalmologia-consulta-cabo-verde.jpg',
      photoAlt:'Consulta de oftalmologia entre profissional de saúde e paciente',
      url:'especialidades/oftalmologia/index.html',
      explanation:'A oftalmologia é a especialidade médica dedicada à saúde dos olhos e da visão — do diagnóstico e prevenção ao acompanhamento contínuo de condições oculares, em todas as fases da vida.',
      situations:['Visão turva ao perto ou ao longe','Dores de cabeça frequentes associadas à leitura ou a ecrãs','Historial familiar de glaucoma ou diabetes'],
      expect:'Normalmente, a consulta começa com uma conversa sobre o seu histórico visual e queixas atuais. Segue-se um exame da acuidade visual e da saúde ocular externa, e muitas vezes a medição da pressão intraocular.',
      references:[['American Academy of Ophthalmology','https://www.aao.org/eye-health']],
      related:['pediatria','medicina-interna','especializados'],
      exams:[
        { num:'01', name:'Campimetria', price:{praia:'5 000 CVE', mindelo:null},
          serve:'Avalia o campo visual, incluindo a visão periférica, e ajuda a mapear áreas de menor sensibilidade visual quando há indicação clínica.',
          como:'É feito um olho de cada vez. A pessoa fixa um ponto central no perímetro e assinala pequenas luzes que aparecem em diferentes posições; o aparelho cria um mapa da resposta visual sem tocar no olho.',
          photo:'assets/exames/exame-campimetria-aparelho.jpg', photoAlt:'Aparelho de campimetria para avaliação do campo visual',
          source:['American Academy of Ophthalmology','https://www.aao.org/eye-health/tips-prevention/visual-field-testing'] },
        { num:'02', name:'Retinografia', price:{praia:'2 500 CVE', mindelo:'2 500 CVE'},
          serve:'Regista imagens detalhadas do fundo do olho, incluindo retina, mácula, nervo óptico e vasos, permitindo documentar e comparar alterações quando necessário.',
          como:'A pessoa coloca o queixo e a testa nos apoios da câmara e olha para um alvo luminoso. São realizadas fotografias de um ou de ambos os olhos; em alguns casos, a dilatação é definida pela equipa.',
          photo:'assets/exames/exame-retinografia-aparelho.jpg', photoAlt:'Câmara de retinografia para fotografar o fundo do olho',
          source:['Cleveland Clinic','https://my.clevelandclinic.org/health/diagnostics/fundus-photography'] },
        { num:'03', name:'Topografia corneana', price:{praia:'7 000 CVE', mindelo:null},
          serve:'Mapeia a curvatura da córnea, ajudando a avaliar irregularidades e a orientar o acompanhamento de situações definidas pelo oftalmologista.',
          como:'A pessoa senta-se diante do equipamento e olha para um ponto fixo. O aparelho capta a imagem em poucos segundos, sem contacto com o olho e, em regra, de forma indolor.',
          photo:'assets/exames/exame-topografia-corneana-aparelho.jpg', photoAlt:'Aparelho de topografia corneana para mapear a superfície da córnea',
          source:['American Academy of Ophthalmology','https://www.aao.org/eye-health/treatments/corneal-topography-4'] },
        { num:'04', name:'OCT', price:{praia:'10 000 CVE', mindelo:'10 000 CVE'},
          serve:'Produz imagens em corte da retina e de camadas oculares, apoiando a avaliação e o acompanhamento de alterações da retina e do nervo óptico conforme indicação clínica.',
          como:'A pessoa repousa o queixo e a testa no aparelho e fixa um alvo. O exame usa ondas de luz para fazer a leitura sem tocar no olho; em certas situações, a equipa pode indicar dilatação das pupilas.',
          photo:'assets/exames/exame-oct-aparelho.jpg', photoAlt:'Aparelho OCT para imagens de corte da retina',
          source:['American Academy of Ophthalmology','https://www.aao.org/eye-health/treatments/what-is-optical-coherence-tomography'] }
      ]
    },
    pediatria: {
      name:'Pediatria', order:'02', locations:['praia','mindelo'], locLabel:'Ambas',
      desc:'Acompanhamento atento para cada fase do crescimento.',
      photo:'assets/specialties/pediatria-familia-cabo-verde.jpg',
      photoAlt:'Médica em consulta pediátrica com uma criança e a família',
      url:'especialidades/pediatria/index.html',
      explanation:'A pediatria acompanha a saúde e o desenvolvimento de crianças e adolescentes, desde o nascimento até ao final da adolescência, em estreita parceria com os pais ou responsáveis.',
      situations:['Consultas de vigilância de saúde infantil','Preocupações com o desenvolvimento ou crescimento','Atualização do calendário de vacinação'],
      expect:'A consulta inclui normalmente a avaliação do peso, altura e desenvolvimento da criança, uma conversa sobre alimentação, sono e comportamento, e espaço para os pais colocarem as suas questões.',
      references:[['American Academy of Pediatrics / HealthyChildren','https://www.healthychildren.org/']],
      related:['oftalmologia','ginecologia','especializados']
    },
    'medicina-interna': {
      name:'Medicina Interna', order:'03', locations:['mindelo'], locLabel:'Mindelo',
      desc:'Avaliação clínica e acompanhamento global no Mindelo.',
      photo:'assets/specialties/medicina-interna-consulta-cabo-verde.jpg',
      photoAlt:'Consulta de medicina interna entre médica e paciente adulto',
      url:'especialidades/medicina-interna/index.html',
      explanation:'A medicina interna acompanha a saúde global do adulto, integrando diferentes áreas clínicas — é frequentemente o primeiro ponto de contacto para diagnóstico e orientação.',
      situations:['Check-up anual de rotina','Sintomas persistentes sem causa aparente','Acompanhamento de doenças crónicas'],
      expect:'O internista começa por rever o seu historial clínico e a medicação atual, seguido de um exame físico geral. É também o momento para discutir resultados de exames ou preparar o acompanhamento de uma condição crónica.',
      references:[['American College of Physicians','https://www.acponline.org/']],
      related:['cardiologia','especializados','ortopedia']
    },
    cardiologia: {
      name:'Cardiologia', order:'04', locations:['mindelo'], locLabel:'Mindelo',
      desc:'Atenção à saúde do coração, disponível no Mindelo.',
      photo:'assets/specialties/cardiologia-prevencao-cabo-verde.jpg',
      photoAlt:'Consulta de prevenção cardiovascular com paciente adulto',
      url:'especialidades/cardiologia/index.html',
      explanation:'A cardiologia dedica-se à prevenção, diagnóstico e acompanhamento de condições que afetam o coração e o sistema circulatório.',
      situations:['Tensão arterial elevada em medições recentes','Palpitações ou falta de ar em esforços habituais','Historial familiar de doença cardíaca'],
      expect:'A consulta inclui tipicamente a medição da tensão arterial, auscultação cardíaca e uma conversa sobre hábitos, historial familiar e sintomas.',
      references:[['American Heart Association','https://www.heart.org/en/health-topics']],
      related:['medicina-interna','especializados','ortopedia']
    },
    ortopedia: {
      name:'Ortopedia', order:'05', locations:['mindelo'], locLabel:'Mindelo',
      desc:'Cuidados para ossos, articulações e mobilidade no Mindelo.',
      photo:'assets/specialties/ortopedia-movimento-cabo-verde.jpg',
      photoAlt:'Avaliação ortopédica de mobilidade num consultório',
      url:'especialidades/ortopedia/index.html',
      explanation:'A ortopedia trata condições que afetam ossos, articulações, músculos e ligamentos — desde lesões pontuais a desconforto persistente que limita o movimento.',
      situations:['Dor persistente numa articulação ou osso','Lesão desportiva ou queda recente','Limitação de movimento no dia a dia'],
      expect:'O especialista avalia o movimento, a força e a zona de desconforto referida, além de rever o historial da lesão ou sintoma.',
      references:[['OrthoInfo / AAOS','https://orthoinfo.aaos.org/']],
      related:['medicina-interna','cardiologia','ginecologia']
    },
    ginecologia: {
      name:'Ginecologia', order:'06', locations:['mindelo'], locLabel:'Mindelo',
      desc:'Saúde da mulher com proximidade e acompanhamento no Mindelo.',
      photo:'assets/specialties/ginecologia-consulta-cabo-verde.jpg',
      photoAlt:'Consulta de ginecologia entre médica e paciente adulta',
      url:'especialidades/ginecologia/index.html',
      explanation:'A ginecologia acompanha a saúde da mulher em todas as fases da vida, com cuidados preventivos e de rotina, além do acompanhamento de questões específicas.',
      situations:['Consulta de rotina anual','Alterações no ciclo menstrual','Dúvidas sobre planeamento familiar e contraceção'],
      expect:'A consulta inclui uma conversa sobre o seu historial ginecológico e queixas atuais, podendo incluir exame físico consoante o motivo da visita.',
      references:[['ACOG Women\u2019s Health','https://www.acog.org/womens-health']],
      related:['medicina-interna','pediatria','especializados']
    },
    especializados: {
      name:'Cuidados clínicos especializados', order:'07', locations:['praia'], locLabel:'Praia',
      desc:'Endocrinologia e Neurologia disponíveis na Praia.',
      photo:'assets/specialties/endocrinologia-neurologia-cabo-verde.jpg',
      photoAlt:'Consulta multidisciplinar de endocrinologia e neurologia',
      url:'especialidades/endocrinologia-neurologia/index.html',
      explanation:'A endocrinologia acompanha o sistema hormonal — da tiroide à diabetes — enquanto a neurologia se dedica ao sistema nervoso central e periférico. Reunimos as duas áreas na Praia.',
      situations:['Cansaço persistente ou alterações de peso sem explicação','Dores de cabeça frequentes ou que mudam de padrão','Historial familiar de diabetes, doença da tiroide ou condições neurológicas'],
      expect:'Na primeira consulta, o especialista reúne o seu historial clínico e sintomas, podendo solicitar exames de sangue ou de imagem consoante a área a avaliar.',
      references:[['Endocrine Society','https://www.endocrine.org/patient-engagement/endocrine-library'],['American Academy of Neurology','https://www.aan.com/tools-resources/brain-health']],
      related:['oftalmologia','medicina-interna','cardiologia']
    }
  };
  var SPEC_ORDER = ['oftalmologia','pediatria','medicina-interna','cardiologia','ortopedia','ginecologia','especializados'];

  // ================= DADOS: ARTIGOS =================
  var ARTICLES = {
    'oftalmologia-sinais': { title:'5 sinais de que é hora de visitar o oftalmologista', cat:'Oftalmologia', specialty:'oftalmologia', read:'3 min', excerpt:'A visão muda de forma tão gradual que é fácil não notar — estes sinais merecem atenção mais cedo.',
      body:['A maior parte das alterações na visão acontece de forma lenta — o cérebro vai-se adaptando, e só percebemos o problema quando já está mais avançado. Por isso, esperar por sintomas óbvios nem sempre é a melhor estratégia.','Visão turva ao perto ou ao longe, mesmo que ligeira, dores de cabeça frequentes associadas à leitura ou a ecrãs, e sensibilidade invulgar à luz são sinais que vale a pena levar a sério.','Quem tem historial familiar de glaucoma, diabetes ou hipertensão deve ter ainda mais atenção, já que estas condições podem afetar a visão sem sintomas evidentes numa fase inicial.','Um exame de rotina anual continua a ser a forma mais simples de detetar alterações antes que interfiram no dia a dia. Este artigo tem carácter informativo — a avaliação de qualquer sintoma deve ser feita por um profissional.'] },
    'endocrinologia-sinais': { title:'O que faz um endocrinologista? Sinais para não ignorar', cat:'Endocrinologia', specialty:'especializados', read:'3 min', excerpt:'Cansaço, alterações de peso ou de humor podem ter origem hormonal. Saiba quando vale a pena investigar.',
      body:['O sistema endócrino regula, através de hormonas, processos como o metabolismo, o crescimento e os níveis de energia do corpo. Quando este sistema se desequilibra, os sinais nem sempre são óbvios.','Cansaço persistente, alterações de peso sem explicação, mudanças de humor, sede excessiva ou alterações no ciclo menstrual são exemplos de sintomas que podem ter origem hormonal — e que muitas vezes são atribuídos, à partida, a outras causas.','Doenças da tiroide e diabetes estão entre as condições mais comuns acompanhadas em endocrinologia, mas a especialidade cobre um espetro mais amplo do sistema hormonal.','Se tem sintomas persistentes sem explicação clara, uma consulta de endocrinologia pode ajudar a perceber se a origem é hormonal. Este artigo tem carácter informativo geral e não substitui avaliação médica.'] },
    'checkup-anual': { title:'Check-up anual: os exames que fazem a diferença', cat:'Medicina Interna', specialty:'medicina-interna', read:'3 min', excerpt:'Um check-up de rotina não é só para quando algo corre mal — é a ferramenta mais simples de prevenção que existe.',
      body:['É comum só marcar consulta quando algo já incomoda. Mas grande parte do valor de um check-up está precisamente em detetar alterações antes de se tornarem sintomas.','Numa consulta de medicina interna, o médico avalia o quadro geral de saúde — não só um órgão ou queixa isolada — e ajuda a decidir se é preciso encaminhamento para outra especialidade.','Vale a pena levar à primeira consulta uma lista dos medicamentos que toma, historial familiar relevante e quaisquer sintomas recentes, mesmo que pareçam pouco importantes.','A prevenção continua a ser, na maioria dos casos, mais simples e eficaz do que tratar algo já instalado.'] },
    'tensao-arterial': { title:'Tensão arterial alta: o que precisa de saber', cat:'Cardiologia', specialty:'cardiologia', read:'4 min', excerpt:'Chamam-lhe o "assassino silencioso" porque raramente dá sintomas — e é por isso que a rotina de medição importa.',
      body:['A hipertensão arterial é frequentemente chamada de "assassino silencioso" porque, na maioria dos casos, não provoca sintomas percetíveis. Sentir-se bem não é garantia de que a tensão está controlada.','Fatores como alimentação rica em sal, sedentarismo, stress prolongado e sono insuficiente influenciam os valores de tensão arterial ao longo do tempo — pequenas mudanças de hábito podem ter impacto real.','Medições ocasionais fora de casa nem sempre contam a história toda. Um acompanhamento regular, especialmente para quem tem historial familiar, é a forma mais fiável de perceber tendências.','Se tem tido leituras elevadas, ou simplesmente não mede a tensão há algum tempo, marcar uma consulta é o primeiro passo — este artigo não substitui avaliação médica.'] },
    'calendario-pediatrico': { title:'Calendário de consultas: acompanhar o crescimento do seu filho', cat:'Pediatria', specialty:'pediatria', read:'3 min', excerpt:'As consultas de vigilância não são só sobre vacinas — são o momento de acompanhar cada fase do desenvolvimento.',
      body:['As consultas de vigilância de saúde infantil acompanham muito mais do que peso e altura: avaliam marcos de desenvolvimento motor, da fala e social, próprios de cada idade.','Manter uma curva de crescimento consistente ao longo do tempo é mais informativo do que qualquer medição isolada — por isso a regularidade das consultas importa tanto quanto a própria consulta.','Entre visitas agendadas, sinais como febre persistente, mudanças bruscas no apetite ou no comportamento não precisam esperar pela próxima marcação de rotina.','O pediatra é um parceiro dos pais nesta fase — nenhuma dúvida é pequena demais para ser perguntada.'] },
    'dores-articulares': { title:'Dores nas articulações: quando não são só "coisas da idade"', cat:'Ortopedia', specialty:'ortopedia', read:'4 min', excerpt:'Nem toda a dor articular é inevitável com a idade. Saber reconhecer os sinais ajuda a agir mais cedo.',
      body:['É comum atribuir dores nas articulações apenas ao avançar da idade — mas nem sempre é essa a explicação, e adiar a avaliação pode significar perder tempo valioso.','A ortopedia trata causas mecânicas e estruturais — lesões, desgaste, problemas de alinhamento — que podem ser avaliadas e tratadas em qualquer idade.','Rigidez matinal com mais de 30 minutos, inchaço visível, ou dor que piora com o repouso em vez de melhorar são sinais que merecem avaliação — diferentes do desconforto ocasional após esforço.','Quanto mais cedo se identifica a causa, mais opções existem para preservar mobilidade e qualidade de vida a longo prazo.'] },
    'checkup-ginecologico': { title:'Consultas de rotina: porque não deve adiar o check-up anual', cat:'Ginecologia', specialty:'ginecologia', read:'3 min', excerpt:'Muitas condições não dão sintomas nas fases iniciais — a consulta de rotina continua a ser a melhor prevenção.',
      body:['É fácil adiar a consulta de ginecologia quando não há nada que pareça "errado". Mas muitas condições relevantes não dão sintomas nas fases iniciais, e é aí que a consulta de rotina faz mais diferença.','As necessidades mudam ao longo da vida — da adolescência à gravidez, até à perimenopausa e menopausa — e a consulta de rotina acompanha essa evolução, não apenas uma preocupação pontual.','Sentir-se confortável para fazer perguntas, mesmo as que parecem pequenas, faz parte de uma boa consulta. Não há tema fora de lugar quando se trata da sua saúde.','Se já não se recorda da última consulta de rotina, esse é, só por si, um bom motivo para marcar uma.'] },
    'neurologia-sinais': { title:'Dores de cabeça frequentes: quando procurar um neurologista', cat:'Neurologia', specialty:'especializados', read:'3 min', excerpt:'Nem toda a dor de cabeça é igual. Reconhecer os sinais de alerta ajuda a decidir quando marcar consulta.',
      body:['A maioria das dores de cabeça é benigna e passageira, mas alguns padrões merecem avaliação mais cuidada por um neurologista.','Dores de cabeça frequentes ou que mudam de padrão, tonturas recorrentes, alterações de sensibilidade ou força num lado do corpo, e episódios de perda de memória são sinais que justificam avaliação neurológica.','A neurologia acompanha o sistema nervoso central e periférico — desde enxaquecas e tonturas a condições mais complexas — sempre com base numa história clínica detalhada.','Se as suas dores de cabeça mudaram de padrão ou frequência recentemente, vale a pena falar com um profissional. Este artigo é informativo e não substitui avaliação médica.'] }
  };
  var ARTICLE_ORDER = ['oftalmologia-sinais','endocrinologia-sinais','calendario-pediatrico','neurologia-sinais','checkup-anual','tensao-arterial','dores-articulares','checkup-ginecologico'];

  // ================= DADOS: GALERIA =================
  var GALLERY_PRAIA = [
    { file:'assets/gallery-praia/praia-sala-oftalmologia.jpg', alt:'Sala de oftalmologia da Clínica da Praia', clinic:'Praia · Santiago', caption:'Sala de oftalmologia' },
    { file:'assets/gallery-praia/praia-equipamento-diagnostico.jpg', alt:'Equipamentos de diagnóstico da Clínica da Praia', clinic:'Praia · Santiago', caption:'Equipamentos de diagnóstico' },
    { file:'assets/gallery-praia/praia-consultorio-avaliacao.jpg', alt:'Consultório da Clínica da Praia', clinic:'Praia · Santiago', caption:'Consultório de avaliação' },
    { file:'assets/gallery-praia/praia-identidade-clinica.jpg', alt:'Identidade visual na entrada da Clínica da Praia', clinic:'Praia · Santiago', caption:'Identidade da clínica' }
  ];
  var GALLERY_MINDELO = [
    { file:'assets/gallery/fachada-mindelo.jpg', alt:'Fachada da Clínica Espaço Saúde+ no Mindelo, com placa de horário e especialidades à entrada', clinic:'Mindelo · São Vicente', caption:'Fachada da clínica' },
    { file:'assets/gallery/clinica-recepcao.jpg', alt:'Corredor e área de espera da Clínica de Mindelo', clinic:'Mindelo · São Vicente', caption:'Área de espera' },
    { file:'assets/gallery/oftalmologia-consultorio-1.jpg', alt:'Consultório de oftalmologia da Clínica de Mindelo, com lâmpada de fenda e cadeira de exame', clinic:'Mindelo · São Vicente', caption:'Consultório de Oftalmologia' },
    { file:'assets/gallery/oftalmologia-consultorio-2.jpg', alt:'Vista alargada do consultório de oftalmologia da Clínica de Mindelo', clinic:'Mindelo · São Vicente', caption:'Consultório de Oftalmologia' },
    { file:'assets/gallery/oftalmologia-equipamento.jpg', alt:'Equipamento de imagiologia oftalmológica da Clínica de Mindelo', clinic:'Mindelo · São Vicente', caption:'Equipamento de Oftalmologia' }
  ];
  var GALLERY = GALLERY_PRAIA.concat(GALLERY_MINDELO);

  // ================= RENDER: ESPECIALIDADES (faixa estilo streaming) =================
  var specialtyRail = document.getElementById('specialtyRail');
  SPEC_ORDER.forEach(function(id){
    var d = SPECIALTIES[id];
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'specialty-streaming__card';
    btn.dataset.specialty = id;
    btn.innerHTML =
      '<img src="'+d.photo+'" alt="'+d.photoAlt+'" loading="lazy">'+
      '<div class="specialty-streaming__shade"></div>'+
      '<div class="specialty-streaming__meta">'+
        '<span class="specialty-streaming__number">'+d.order+'</span>'+
        '<span class="specialty-streaming__location">'+d.locLabel+'</span>'+
      '</div>'+
      '<div class="specialty-streaming__copy">'+
        '<h3>'+d.name+'</h3>'+
        '<p>'+d.desc+'</p>'+
        '<span class="specialty-streaming__link">Ver especialidade <span class="specialty-streaming__arrow">→</span></span>'+
      '</div>';
    specialtyRail.appendChild(btn);
  });


  // ================= RENDER: BLOG (cartão editorial) =================
  var blogGrid = document.getElementById('blogGrid');
  ARTICLE_ORDER.forEach(function(id){
    var a = ARTICLES[id];
    var spec = SPECIALTIES[a.specialty];
    var card = document.createElement('button');
    card.className = 'article-card';
    card.type = 'button';
    card.dataset.article = id;
    card.innerHTML =
      '<div class="article-card__photo"><img src="'+(spec ? spec.photo : '')+'" alt="" loading="lazy"></div>'+
      '<div class="article-card__body">'+
        '<p class="article-card__cat">'+a.cat+'</p>'+
        '<h3>'+a.title+'</h3>'+
        '<span class="article-card__underline" aria-hidden="true"></span>'+
        '<span class="article-card__meta"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>'+a.read+' de leitura</span>'+
      '</div>';
    blogGrid.appendChild(card);
  });

  // Autoplay do carrossel de conteúdos (a faixa de especialidades usa scroll/snap manual, conforme ficheiros fornecidos)
  function setupAutoplay(trackId, intervalMs, cardSelector){
    var track = document.getElementById(trackId);
    if(!track) return;
    cardSelector = cardSelector || '.carousel-card';
    var timer = null;
    function step(){
      var first = track.querySelector(cardSelector);
      var advance = first ? first.offsetWidth + 18 : 260;
      var maxScroll = track.scrollWidth - track.clientWidth;
      if(track.scrollLeft >= maxScroll - 4){
        track.scrollTo({left:0, behavior:'smooth'});
      } else {
        track.scrollBy({left:advance, behavior:'smooth'});
      }
    }
    function start(){ stop(); if(!prefersReducedMotion) timer = setInterval(step, intervalMs); }
    function stop(){ if(timer) clearInterval(timer); timer = null; }
    track.addEventListener('mouseenter', stop);
    track.addEventListener('mouseleave', start);
    track.addEventListener('touchstart', stop, {passive:true});
    track.addEventListener('touchend', function(){ setTimeout(start, 3500); }, {passive:true});
    track.addEventListener('focusin', stop);
    track.addEventListener('focusout', start);
    start();
  }
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setupAutoplay('specialtyRail', 2000, '.specialty-streaming__card');
  setupAutoplay('blogGrid', 2000, '.article-card');

  // ================= RENDER: GALERIA (duas faixas) + LIGHTBOX ACESSÍVEL =================
  var railPraia = document.getElementById('galleryRailPraia');
  var railMindelo = document.getElementById('galleryRailMindelo');
  var lastFocusedCard = null;

  function buildGalleryCard(g, globalIndex){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gallery-card';
    btn.dataset.galleryIndex = globalIndex;
    btn.setAttribute('aria-label', g.clinic + ' — ' + g.caption + '. Abrir imagem ampliada.');
    btn.innerHTML =
      '<img src="'+g.file+'" alt="'+g.alt+'" loading="lazy">'+
      '<div class="gallery-card__shade"></div>'+
      '<span class="gallery-card__zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></span>'+
      '<div class="gallery-card__label"><span class="gallery-card__clinic">'+g.clinic+'</span><span class="gallery-card__caption">'+g.caption+'</span></div>';
    btn.addEventListener('click', function(){ lastFocusedCard = btn; openLightbox(globalIndex); });
    return btn;
  }
  GALLERY_PRAIA.forEach(function(g, i){ railPraia.appendChild(buildGalleryCard(g, i)); });
  GALLERY_MINDELO.forEach(function(g, i){ railMindelo.appendChild(buildGalleryCard(g, GALLERY_PRAIA.length + i)); });

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lbIndex = 0;
  function openLightbox(i){
    lbIndex = i;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.classList.add('view-open');
    document.querySelector('[data-lightbox-close]').focus();
  }
  function updateLightbox(){
    var g = GALLERY[lbIndex];
    lightboxImg.src = g.file;
    lightboxImg.alt = g.alt;
    lightboxCaption.textContent = g.clinic + ' — ' + g.caption + ' (' + (lbIndex+1) + ' / ' + GALLERY.length + ')';
  }
  function closeLightbox(){
    lightbox.classList.remove('active');
    document.body.classList.remove('view-open');
    if(lastFocusedCard){ lastFocusedCard.focus(); lastFocusedCard = null; }
  }
  document.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
  document.querySelector('[data-lightbox-prev]').addEventListener('click', function(){ lbIndex = (lbIndex - 1 + GALLERY.length) % GALLERY.length; updateLightbox(); });
  document.querySelector('[data-lightbox-next]').addEventListener('click', function(){ lbIndex = (lbIndex + 1) % GALLERY.length; updateLightbox(); });
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });

  // ================= REVEAL ON SCROLL =================
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry, i){
      if(entry.isIntersecting){
        entry.target.style.transitionDelay = (i % 4) * 70 + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal, .reveal-mask').forEach(function(el){ io.observe(el); });

  // ================= CONTADORES =================
  function animateCount(el){
    var target = +el.dataset.count;
    var start = performance.now(); var dur = 1200;
    function step(now){
      var p = Math.min((now-start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.floor(eased * target);
      if(p < 1) requestAnimationFrame(step); else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  var countIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){ if(entry.isIntersecting){ animateCount(entry.target); countIo.unobserve(entry.target); } });
  }, {threshold:0.5});
  document.querySelectorAll('.indicator-num').forEach(function(el){ countIo.observe(el); });

  // ================= PÁGINAS DE DETALHE (FLIP) =================
  var viewBusy = false; // impede que cliques duplos/triplos sobreponham animações
  function flipOpen(triggerEl, view, populate){
    if(viewBusy) return;
    viewBusy = true;
    var first = triggerEl.getBoundingClientRect();
    document.body.classList.add('view-open');
    populate();
    view.scrollTop = 0;
    view.classList.add('active');
    var last = view.getBoundingClientRect();
    var dx = first.left - last.left, dy = first.top - last.top;
    var sx = first.width / last.width, sy = first.height / last.height;
    view.style.transformOrigin = 'top left';
    view.style.transition = 'none';
    view.style.transform = 'translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')';
    view.style.opacity = '.4';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        view.style.transition = 'transform .65s cubic-bezier(.22,1,.36,1), opacity .5s ease';
        view.style.transform = 'none';
        view.style.opacity = '1';
        setTimeout(function(){ viewBusy = false; }, 650);
      });
    });
  }
  function fadeOpen(view, populate){
    if(viewBusy) return;
    viewBusy = true;
    document.body.classList.add('view-open');
    populate();
    view.scrollTop = 0;
    view.style.transition = 'none';
    view.style.transform = 'scale(.94)';
    view.style.opacity = '0';
    view.classList.add('active');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        view.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), opacity .45s ease';
        view.style.transform = 'none';
        view.style.opacity = '1';
        setTimeout(function(){ viewBusy = false; }, 500);
      });
    });
  }
  function closeView(view, after){
    if(viewBusy) return;
    viewBusy = true;
    view.style.transition = 'opacity .35s ease, transform .35s ease';
    view.style.opacity = '0';
    view.style.transform = 'scale(.97)';
    setTimeout(function(){
      view.classList.remove('active');
      view.style.transition = ''; view.style.transform = ''; view.style.opacity = '';
      document.body.classList.remove('view-open');
      viewBusy = false;
      if(after) after();
    }, 320);
  }

  function locationCardHTML(locId){
    var c = CLINICS[locId];
    var primaryStyle = locId === 'mindelo' ? ' style="background:var(--azul-medio)"' : '';
    var borderStyle = locId === 'mindelo' ? ' style="border-top-color:var(--azul-medio)"' : '';
    return '<div class="location-panel"'+borderStyle+'>'+
      '<p class="loc-eyebrow">Ilha de '+c.island+'</p>'+
      '<h3>Clínica '+(locId==='praia'?'na':'no')+' '+c.name+'</h3>'+
      '<div class="loc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.4 7-11.8A7 7 0 1 0 5 9.2C5 14.6 12 21 12 21z"/><circle cx="12" cy="9" r="2.4"/></svg><div><div class="label">Morada</div><div class="val">'+c.address+'</div></div></div>'+
      '<div class="loc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h2l2.4 6-1.4 2.3a11 11 0 0 0 5.7 5.7l2.3-1.4 6 2.4v2a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4z"/></svg><div><div class="label">Telefone / Telemóvel</div><div class="val"><a href="'+c.phoneHref+'">'+c.phone+'</a> · <a href="'+c.mobileHref+'">'+c.mobile+'</a></div></div></div>'+
      '<div class="loc-actions"><a href="'+c.whatsapp+'" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"'+primaryStyle+'><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.3 9.3c.3 2.4 2.4 5 4.8 5.8.6.2 1.2 0 1.5-.5l.4-.7c.2-.3.6-.4.9-.2l1.9.9c.3.1.5.5.4.8-.4 1.5-1.7 2.4-3.2 2.2-3.7-.4-7-3.8-7.4-7.4-.2-1.5.7-2.8 2.2-3.2.3-.1.7.1.8.4l.9 1.9c.1.3 0 .7-.2.9l-.7.4c-.5.3-.7.9-.5 1.5z"/></svg>WhatsApp</a><a href="'+c.maps+'" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Ver no mapa</a></div>'+
    '</div>';
  }

  function populateSpecialist(id){
    var d = SPECIALTIES[id];
    var view = document.getElementById('view-specialist');
    document.getElementById('specialist-eyebrow').textContent = 'Especialidade ' + d.order + ' de 7 · ' + d.locLabel;
    document.getElementById('specialist-name-h1').innerHTML = '<span class="mask-line"><span>'+d.name+'</span></span>';
    document.getElementById('specialist-desc').textContent = d.explanation;

    var sitEl = document.getElementById('specialist-situations');
    sitEl.innerHTML = d.situations.map(function(s,i){ return '<div class="situation-card"><span class="num">0'+(i+1)+'</span><p>'+s+'</p></div>'; }).join('');

    document.getElementById('specialist-expect').textContent = d.expect;

    var examsSection = document.getElementById('specialist-exams-section');
    if(d.exams){
      examsSection.style.display = '';
      var examsRail = document.getElementById('specialist-exams');
      examsRail.innerHTML = d.exams.map(function(ex){
        var locTags = '<span class="loc-tag">Praia — '+ex.price.praia+'</span>' +
          (ex.price.mindelo ? '<span class="loc-tag">Mindelo — '+ex.price.mindelo+'</span>' : '<span class="loc-tag" style="opacity:.55;">Mindelo — não disponível</span>');
        return '<article class="exam-card">'+
          '<div class="exam-card__art"><img src="'+ex.photo+'" alt="'+ex.photoAlt+'" loading="lazy"></div>'+
          '<div class="exam-card__body">'+
            '<div class="exam-card__meta"><span class="exam-card__num">'+ex.num+'</span></div>'+
            '<h3>'+ex.name+'</h3>'+
            '<div class="card-loc-tags" style="margin-bottom:14px;">'+locTags+'</div>'+
            '<div class="exam-card__block"><h5>Para que serve</h5><p>'+ex.serve+'</p></div>'+
            '<div class="exam-card__block"><h5>Como é feito</h5><p>'+ex.como+'</p></div>'+
            '<a class="exam-card__source" href="'+ex.source[1]+'" target="_blank" rel="noopener noreferrer">Fonte: '+ex.source[0]+' ↗</a>'+
          '</div>'+
        '</article>';
      }).join('');
    } else {
      examsSection.style.display = 'none';
    }

    var panelsClass = d.locations.length === 2 ? 'location-panels' : 'location-panels location-panels--single';
    var panelsEl = document.getElementById('specialist-clinics');
    panelsEl.className = panelsClass;
    panelsEl.innerHTML = d.locations.map(locationCardHTML).join('');

    var refEl = document.getElementById('specialist-references');
    refEl.innerHTML = d.references.map(function(r){
      return '<div class="reference-item"><span>'+r[0]+'</span><a href="'+r[1]+'" target="_blank" rel="noopener noreferrer">Visitar site <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></a></div>';
    }).join('');

    var relEl = document.getElementById('specialist-related');
    relEl.innerHTML = d.related.map(function(rid){
      var r = SPECIALTIES[rid];
      return '<button type="button" class="related-card" data-specialty="'+rid+'"><p class="eyebrow">Especialidade '+r.order+'</p><h4>'+r.name+'</h4><span class="arrow">Ver especialidade →</span></button>';
    }).join('');
    relEl.querySelectorAll('[data-specialty]').forEach(function(btn){
      btn.addEventListener('click', function(){ populateSpecialist(btn.dataset.specialty); view.scrollTop = 0; });
    });
  }

  document.querySelectorAll('.specialty-streaming__card[data-specialty]').forEach(function(card){
    card.addEventListener('click', function(){ flipOpen(card, document.getElementById('view-specialist'), function(){ populateSpecialist(card.dataset.specialty); }); });
  });

  function populateArticle(id){
    var a = ARTICLES[id];
    var view = document.getElementById('view-article');
    document.getElementById('article-tag').textContent = a.cat;
    document.getElementById('article-title').innerHTML = '<span class="mask-line"><span>'+a.title+'</span></span>';
    document.getElementById('article-read').textContent = a.read + ' de leitura';
    document.getElementById('article-cat').textContent = a.cat;
    var bodyEl = document.getElementById('article-body');
    bodyEl.innerHTML = '';
    a.body.forEach(function(p){ var pEl = document.createElement('p'); pEl.textContent = p; bodyEl.appendChild(pEl); });
    var link = document.getElementById('article-specialty-link');
    var spec = SPECIALTIES[a.specialty];
    link.textContent = 'Ver especialidade: ' + spec.name;
    link.onclick = function(){ closeView(view, function(){ fadeOpen(document.getElementById('view-specialist'), function(){ populateSpecialist(a.specialty); }); }); };
  }

  document.querySelectorAll('.article-card[data-article]').forEach(function(card){
    card.addEventListener('click', function(){ flipOpen(card, document.getElementById('view-article'), function(){ populateArticle(card.dataset.article); }); });
  });
  document.querySelectorAll('[data-close]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      if(btn.tagName === 'A'){ /* deixa o link #contactos funcionar depois de fechar */ }
      closeView(document.getElementById(btn.dataset.close));
    });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('.view--detail.active').forEach(function(v){ closeView(v); });
      if(lightbox.classList.contains('active')) closeLightbox();
    }
  });

  // ================= CENA ATLAS: seleção de clínica =================
  var atlasLabels = document.querySelectorAll('.atlas-label');
  var atlasBtn = document.getElementById('atlasMapBtn');
  atlasLabels.forEach(function(label){
    label.addEventListener('click', function(){
      var clinic = label.dataset.clinic;
      atlasLabels.forEach(function(l){ l.classList.toggle('is-active', l===label); });
      document.querySelectorAll('.atlas-island').forEach(function(isl){
        isl.classList.toggle('is-active', isl.classList.contains('atlas-island--'+clinic));
      });
      if(atlasBtn) atlasBtn.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(label.dataset.address);
    });
  });
  // O ponto da rota usa animação SMIL nativa do SVG, que o CSS não controla — remove-se via JS
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.atlas-route-dot animateMotion').forEach(function(anim){ anim.remove(); });
  }

  // ================= RODAPÉ =================
  document.querySelector('.year').textContent = new Date().getFullYear();
})();
