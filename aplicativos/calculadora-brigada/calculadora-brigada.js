document.addEventListener("DOMContentLoaded", function () {
  const ufSelect = document.getElementById("uf");
  const grupoSetorialSelect = document.getElementById("grupo_setorial");
  const tipoOcupacaoSelect = document.getElementById("tipo_ocupacao");
  const botaoCalcular = document.querySelector("button");
  const resultadoDiv = document.getElementById("resultado");

  // Mapeamento das opções de tipo de ocupação de acordo com o UF, grupo setorial
  const normas = {
    "MG - INSTRUÇÃO TÉCNICA N. 12 3ª edição. Alterada pela portaria n. 73, de 15 dez 2023, publicada no DOEMG n. 247, ano 131, p. 07":
      {
        gruposSetoriais: [
          "Selecione uma categoria...",
          "A - Residencial",
          "B - Serviço de Hospedagem",
          "C - Comercial",
          "D - Serviço profissional",
          "E - Educacional e cultura física",
          "F - Local de Reunião de Público",
          "G - Serviço automotivo e assemelhados",
          "H - Serviço de saúde e institucional",
          "I - Indústria",
          "J - Depósito",
          "K - Energia",
          "L - Explosivos",
          "M - Especial",
        ],
        tiposOcupacao: {
          "A - Residencial": [
            "Selecione uma categoria...",
            "A-1 Habitação unifamiliar",
            "A-2 Habitação multifamiliar",
            "A-3 Habitação coletiva",
          ],
          "B - Serviço de Hospedagem": [
            "Selecione uma categoria...",
            "B-1 Hotel e assemelhado",
            "B-2 Hotel residencial",
          ],
          "C - Comercial": [
            "Selecione uma categoria...",
            "C-1 Comércio com baixa carga de incêndio",
            "C-2 Comércio com média e alta carga de incêndio",
            "C-3 Centros comerciais de compras (Shopping centers)",
          ],
          "D - Serviço profissional": [
            "Selecione uma categoria...",
            "D-1 Local para prestação de serviço profissional ou condução de negócios",
            "D-2 Agência bancária",
            "D-3 Serviço de reparação",
            "D-4 Laboratório",
          ],
          "E - Educacional e cultura física": [
            "Selecione uma categoria...",
            "E-1 Escola em geral",
            "E-2 Escola especial",
            "E-3 Espaço para cultura física",
            "E-4 Centro de treinamento profissional",
            "E-5 Pré-escola",
            "E-6 Escola para portadores de deficiências",
          ],
          "F - Local de Reunião de Público": [
            "Selecione uma categoria...",
            "F-1 Local onde há objeto de valor inestimável",
            "F-2 Local religioso e velório",
            "F-3 Centro esportivo e de exibição",
            "F-4 Estação e terminal de passageiro",
            "F-5 Arte cênica e auditório",
            "F-6 Casas de show",
            "F-7 Construção provisória e evento temporário",
            "F-8  Local para refeição",
            "F-9 Recreação",
            "F-10 Exposição de objetos e animais",
            "F-11 Clubes sociais e de diversão",
          ],
          "G - Serviço automotivo e assemelhados": [
            "Selecione uma categoria...",
            "G-1 Estacionamento sem acesso de público e sem abastecimento",
            "G-2 Estacionamento com acesso de público e sem abastecimento",
            "G-3 Local dotado de abastecimento de combustível",
            "G-4 Serviço de conservação, manutenção, garagem e reparos, com ou sem abastecimento",
            "G-5 Hangares",
          ],
          "H - Serviço de saúde e institucional": [
            "Selecione uma categoria...",
            "H-1 Hospital veterinário e assemelhados",
            "H-2 Locais onde pessoas requerem cuidados especiais por limitações físicas ou mentais",
            "H-3 Hospital e assemelhado",
            "H-4 Edificações das forças armadas e policiais",
            "H-5 Local onde a liberdade das pessoas sofre restrições",
            "H-6 Clínicas e consultório médico e odontológico",
          ],
          "I - Indústria": [
            "Selecione uma categoria...",
            "I-1 Indústria com carga de incêndio até 300MJ/m²",
            "I-2 Indústria com carga de incêndio entre 301 e 1.200MJ/m²",
            "I-3 Indústria com carga de incêndio superior a 1.200MJ/m²",
          ],
          "J - Depósito": [
            "Selecione uma categoria...",
            "J-1 Depósitos de material incombustível",
            "J-2 Depósito com carga de incêndio até 300MJ/m²",
            "J-3 Depósito com carga de incêndio entre 301 e 1.200MJ/m²",
            "J-4 Depósito com carga de incêndio superior a 1.200MJ/m²",
          ],
          "K - Energia": [],
          "L - Explosivos": [
            "Selecione uma categoria...",
            "L-1 Comércio",
            "L-2 Indústria",
            "L-3 Depósito",
          ],
          "M - Especial": [
            "Selecione uma categoria...",
            "M-1 Túnel",
            "M-2 Líquido ou gás inflamável ou combustível",
            "M-3 Central de comunicação e energia",
            "M-4 Canteiro de obras",
            "M-5 Silos",
            "M-6 Terra selvagem",
            "M-7 Pátio de Containers",
            "M-8 Agronegócio",
          ],
        },
        parametros: {
          "A-1 Habitação unifamiliar": [0, 0, "Isento"],
          "A-2 Habitação multifamiliar": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.1 Para a divisão A-2, todos os empregados da edificação deverão compor a brigada de incêndio e, caso não haja empregados, recomenda-se que haja treinamento da população para evacuação e utilização dos equipamentos e medidas preventivas da edificação.",
          ],
          "A-3 Habitação coletiva": [50, 10, "Nível de treinamento básico"],
          "B-1 Hotel e assemelhado": [50, 10, "Nível de treinamento básico"],
          "B-2 Hotel residencial": [50, 10, "Nível de treinamento básico"],
          "C-1 Comércio com baixa carga de incêndio": [
            40,
            5,
            "Nível de treinamento básico",
          ],
          "C-2 Comércio com média e alta carga de incêndio": [
            40,
            5,
            "Nível de treinamento básico",
          ],
          "C-3 Centros comerciais de compras (Shopping centers)": [
            50,
            20,
            "Nível de treinamento básico. <br><br> Nota: A.6 Na divisão C-3 deverá haver, no mínimo, 01 (um) brigadista profissional por pavimento com área superior a 3.000 m2, sendo este brigadista contado normalmente como parte do número de brigadistas exigidos para a edificação.",
          ],
          "D-1 Local para prestação de serviço profissional ou condução de negócios":
            [30, 10, "Nível de treinamento básico"],
          "D-2 Agência bancária": [40, 10, "Nível de treinamento básico"],
          "D-3 Serviço de reparação": [
            40,
            10,
            "Exceto classificados em G-4. Nível de treinamento básico",
          ],
          "D-4 Laboratório": [40, 10, "Nível de treinamento básico"],
          "E-1 Escola em geral": [
            40,
            20,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "E-2 Escola especial": [40, 20, "Nível de treinamento básico"],
          "E-3 Espaço para cultura física": [
            40,
            20,
            "Nível de treinamento básico",
          ],
          "E-4 Centro de treinamento profissional": [
            40,
            20,
            "Nível de treinamento básico",
          ],
          "E-5 Pré-escola": [
            80,
            80,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "E-6 Escola para portadores de deficiências": [
            80,
            80,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "F-1 Local onde há objeto de valor inestimável": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas. <br><br> Nota: A.7 Na divisão F-1 deverá haver, no mínimo, 01 (um) brigadista profissional por pavimento com área superior a 2.000 m2, sendo este brigadista contado normalmente como parte do número de brigadistas exigidos para a edificação. A área contabilizada para fins de cálculo deverá ser aquela efetivamente utilizada como da divisão F-1 (descontar áreas de apoio onde não haja presença de público).  ",
          ],
          "F-2 Local religioso e velório": [
            100,
            100,
            "01 brigadista a cada 500 pessoas quando o público presente for superior a 3000 pessoas. (ver nota A.3.3) Nível de treinamento profissional; <br><br> Toda a população fixa quando o público for acima de 200 até 3000 pessoas. Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas. <br><br> Nota: A.3.3 Para as divisões F-2 e F-6, o cálculo do número de brigadistas terá por base a população prevista conforme capacidade total do local, podendo, contudo, ser implementada brigada de incêndio de acordo com o público efetivamente presente.",
          ],
          "F-3 Centro esportivo e de exibição": [
            100,
            100,
            "01 brigadista a cada 500 pessoas quando o público presente for superior a 3000 pessoas. (ver nota A.3.2) Nível de treinamento profissional; Toda a população fixa quando o público for acima de 200 até 3000 pessoas. Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas. <br><br> Nota: A.3.2 Para a divisão F-3, o cálculo do número de brigadistas terá por base a população prevista conforme carga de ingressos disponibilizada, podendo, contudo, ser implementada brigada de incêndio de acordo com o público efetivamente presente.",
          ],
          "F-4 Estação e terminal de passageiro": [
            60,
            20,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas.",
          ],
          "F-5 Arte cênica e auditório": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas.",
          ],
          "F-6 Casas de show": [
            100,
            100,
            "01 brigadista a cada 250 pessoas quando o público for superior a 250 pessoas, respeitado o mínimo de 2 brigadistas. Nível de treinamento profissional; Toda a população fixa quando o público for acima de 100 até 250 pessoas, respeitado o mínimo de 2 brigadistas. Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.3 Para as divisões F-2 e F-6, o cálculo do número de brigadistas terá por base a população prevista conforme capacidade total do local, podendo, contudo, ser implementada brigada de incêndio de acordo com o público efetivamente presente.",
          ],
          "F-7 Construção provisória e evento temporário": [
            0,
            0,
            "01 brigadista a cada 500 pessoas, respeitado o mínimo de 2 brigadistas. Nível de treinamento profissional. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas.",
          ],
          "F-8 Local para refeição": [
            60,
            20,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG. <br><br> Nota: A.3.1  Exceto para a divisão F-6, que deverá seguir os parâmetros estabelecidos na Tabela do Anexo A, quando a população prevista no PSCIP for superior a 1.000 (mil) pessoas, deverá ser previsto 01 (um) brigadista orgânico e/ou profissional, conforme o caso, para cada 500 (quinhentas) pessoas.",
          ],
          "F-9 Recreação": [
            40,
            10,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG.",
          ],
          "F-10 Exposição de objetos e animais": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG.",
          ],
          "F-11 Clubes sociais e de diversão": [
            40,
            10,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.3 Para edificações utilizadas para reunião de público (Grupo F) mediante locação, onde não haja população fixa para dimensionamento da brigada de incêndio, quando esta for exigida, deverá haver a presença de, no mínimo, 02 (dois) brigadistas orgânicos e/ou profissionais,conforme o caso, quando da presença de públicos a partir de 100 pessoas em F-6 e 200 pessoas nas demais divisões, sendo o atendimento a tal exigência conferido em eventuais fiscalizações do CBMMG.",
          ],
          "G-1 Estacionamento sem acesso de público e sem abastecimento": [
            100,
            100,
            "Nível de treinamento básico",
          ],
          "G-2 Estacionamento com acesso de público e sem abastecimento": [
            100,
            100,
            "Nível de treinamento básico",
          ],
          "G-3 Local dotado de abastecimento de combustível": [
            100,
            100,
            "Nível de treinamento básico",
          ],
          "G-4 Serviço de conservação, manutenção, garagem e reparos, com ou sem abastecimento":
            [50, 10, "Nível de treinamento básico"],
          "G-5 Hangares": [50, 20, "Nível de treinamento básico"],
          "H-1 Hospital veterinário e assemelhados": [
            50,
            10,
            "Nível de treinamento básico",
          ],
          "H-2 Locais onde pessoas requerem cuidados especiais por limitações físicas ou mentais":
            [
              100,
              100,
              "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
            ],
          "H-3 Hospital e assemelhado": [
            60,
            20,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso. <br><br> Nota: A.5 Na divisão H-3, nos pavimentos onde houver UTIs e centros cirúrgicos, 100% da população fixa dessas áreas citadas deve fazer parte da brigada de incêndio, salvo os funcionários temporários não considerados como parte fixa da população. Para os demais setores do pavimento, devem ser seguidos os parâmetros específicos de cada ambiente. <br><br> Nota: A.5.1 As edificações da ocupação H-3 que possuam mais do que 50 leitos deverão possuir, no mínimo, dois brigadistas profissionais por turno de serviço. ",
          ],
          "H-4 Edificações das forças armadas e policiais": [
            30,
            10,
            "Nível de treinamento básico",
          ],
          "H-5 Local onde a liberdade das pessoas sofre restrições": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "H-6 Clínicas e consultório médico e odontológico": [
            40,
            10,
            "Nível de treinamento básico",
          ],
          "I-1 Indústria com carga de incêndio até 300MJ/m²": [
            40,
            5,
            "Nível de treinamento básico",
          ],
          "I-2 Indústria com carga de incêndio entre 301 e 1.200MJ/m²": [
            50,
            7,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "I-3 Indústria com carga de incêndio superior a 1.200MJ/m²": [
            60,
            10,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "J-1 Depósitos de material incombustível": [0, 0, "Isento"],
          "J-2 Depósito com carga de incêndio até 300MJ/m²": [
            40,
            10,
            "Nível de treinamento básico",
          ],
          "J-3 Depósito com carga de incêndio entre 301 e 1.200MJ/m²": [
            50,
            20,
            "Nível de treinamento básico",
          ],
          "J-4 Depósito com carga de incêndio superior a 1.200MJ/m²": [
            100,
            100,
            "Nível de treinamento básico",
          ],
          "L-1 Comércio": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "L-2 Indústria": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "L-3 Depósito": [
            100,
            100,
            "Nível de treinamento básico. <br><br> Nota: A.2 Para todas as divisões de ocupação dos grupos F e L e para as divisões E-1, E-5, E-6, H-2, H-3, H-5, I-2, I-3, J-3 e J-4, será necessário o número mínimo de 02 (dois brigadistas orgânicos e/ou profissionais, conforme o caso.",
          ],
          "M-1 Túnel": [
            0,
            0,
            "Nota: A.9 Os túneis (M-1) deverão possuir brigada de incêndio quando identificado pelo responsável técnico que há elevado risco de incêndio, conforme NBR específica.",
          ],
          "M-2 Líquido ou gás inflamável ou combustível": [
            60,
            10,
            "Nível de treinamento básico",
          ],
          "M-3 Central de comunicação e energia": [
            100,
            100,
            "Nível de treinamento básico",
          ],
          "M-4 Canteiro de obras": [30, 10, "Nível de treinamento básico"],
          "M-5 Silos": [50, 20, "Nível de treinamento básico"],
          "M-6 Terra selvagem": [30, 10, "Nível de treinamento básico"],
          "M-7 Pátio de Containers": [40, 15, "Nível de treinamento básico"],
          "M-8 Agronegócio": [
            0,
            0,
            "Nota: A.13 As edificações da Divisão M-8 são isentas da brigada de incêndio, devendo as edificações e áreas de apoio possuírem brigada conforme exigência para o uso específico.",
          ],
        },
      },
  };

  // Preencher as opções do campo "Grupo Setorial" com base na UF selecionada
  ufSelect.addEventListener("change", function () {
    const ufSelecionada = this.value;
    const gruposSetoriais = normas[ufSelecionada]?.gruposSetoriais || [];
    preencherSelect(grupoSetorialSelect, gruposSetoriais);
    limparSelect(tipoOcupacaoSelect);
  });

  // Preencher as opções do campo "Tipo de Ocupação" com base no Grupo Setorial selecionado
  grupoSetorialSelect.addEventListener("change", function () {
    const ufSelecionada = ufSelect.value;
    const grupoSelecionado = this.value;
    const tiposOcupacao =
      normas[ufSelecionada]?.tiposOcupacao?.[grupoSelecionado] || [];
    preencherSelect(tipoOcupacaoSelect, tiposOcupacao);
  });

  // Função para preencher as opções de um <select> com base em um array de valores
  function preencherSelect(selectElement, options) {
    limparSelect(selectElement);
    options.forEach(function (optionValue) {
      const option = document.createElement("option");
      option.value = option.textContent = optionValue;
      selectElement.appendChild(option);
    });
  }

  // Função para limpar as opções de um <select>
  function limparSelect(selectElement) {
    selectElement.innerHTML = "";
  }

  // Calcular a brigada de incêndio orgânica ao clicar no botão "Calcular"
botaoCalcular.addEventListener("click", function (event) {
  event.preventDefault(); // Evita o envio do formulário padrão
  const populacaoFixa = parseInt(document.getElementById("populacao").value);
  const tipoOcupacao = tipoOcupacaoSelect.value;
  const ufSelecionada = ufSelect.value;
  const nomeInstituicao = document.getElementById("nome_completo").value;

  if (!isNaN(populacaoFixa) && tipoOcupacao && ufSelecionada) {
    const parametros = normas[ufSelecionada].parametros[tipoOcupacao];
    const resultado = calcularBrigada(populacaoFixa, parametros);

    // Verifica se o grupo selecionado precisa de entrada de público
    let inputPublico;
    if (verificaGrupoSetorial(grupoSetorialSelect.value)) {
      inputPublico = document.getElementById("publicoInput").value || "N/A";
    } else {
      inputPublico = "N/A"; // Define um valor padrão para grupos que não necessitam de público
    }

    // Passe o texto do nome da instituição como um parâmetro para a função exibirResultado()
    exibirResultado(resultado, ufSelecionada, populacaoFixa, inputPublico, nomeInstituicao);

    resultadoDiv.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
});
  
  // Função para exibir o resultado na página
  function exibirResultado(
    resultado,
    ufSelecionada,
    populacaoFixa,
    inputPublico,
    nomeArea
  ) {
    resultadoDiv.innerHTML = `<p><center><strong>${ufSelecionada}</strong></center></p><p>Nome da Área/Instituição: ${nomeArea}</p><p>População Fixa: ${populacaoFixa}</p><p>Público (se houver): ${inputPublico}</p><p><strong>Total de Brigadistas: ${resultado.totalBrigadistas}</strong></p><p>${resultado.texto}</p>`;
  }

  // Função para verificar se o grupo setorial selecionado começa com "F"
  function verificaGrupoSetorial(grupoSetorial) {
    return grupoSetorial.startsWith("F");
  }

  // Função para criar uma div para inserir o valor do público
  function criarDivPublico() {
    const publicoDiv = document.getElementById("publicoDiv");
    publicoDiv.innerHTML = ""; // Limpa o conteúdo atual da div

    const inputPublico = document.createElement("input");
    inputPublico.setAttribute("type", "number");
    inputPublico.setAttribute("id", "publicoInput");
    inputPublico.setAttribute(
      "placeholder",
      "Insira o número previsto do público"
    );

    publicoDiv.appendChild(inputPublico);
  }


  // Adiciona um listener para o evento change no select
  grupoSetorialSelect.addEventListener("change", function () {
    const selecionado = this.value; // Obtém o valor selecionado do select

    if (verificaGrupoSetorial(selecionado)) {
      criarDivPublico();
    } else {
      const publicoDiv = document.getElementById("publicoDiv");
      publicoDiv.innerHTML = "";
    }
  });

  // Função para calcular a brigada de incêndio orgânica com base no tipo de ocupação selecionado
  function calcularBrigada(populacaoFixa, parametros) {
    const [porcentagem10, porcentagemMais10, texto] = parametros;
    const populacao10 = Math.min(10, populacaoFixa);
    const populacaoMais10 = populacaoFixa > 10 ? populacaoFixa - 10 : 0;
    const brigadistas10 = Math.ceil((porcentagem10 / 100) * populacao10);
    const brigadistasMais10 = Math.ceil(
      (porcentagemMais10 / 100) * populacaoMais10
    );
    const totalBrigadistas = brigadistas10 + brigadistasMais10;
    return { totalBrigadistas, texto };
  }
});
