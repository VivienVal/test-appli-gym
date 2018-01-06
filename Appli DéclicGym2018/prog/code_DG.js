//copie Fichier JS de Sol Gym SylVal
//ATTENTION ne surtout pas mettre des anti-slashs entre '...\...'; mettre des slashs 
// BOUCLE 	avec incrémentation
// pour plusieurs conditions pour et if ((condition1 &&condition2), pour ou if (condition1 || condition2)
// conditions : ==égal != différent ===contenu et type égal >= supérieur ou égal,...
// conseil de Vivien voir pour utiliser bootstrap et angular

window.onload = function(){ //Pour charger tous les élèments disponibles

//les données
	lesImages='';
	video='';
	x=0;
	nbImage=56;
	choix=0;
	clic=1;
	bloque=1;
	tableauImage=[0,0];
	for (i=0; i<57; i++){tableauImage[i]=i;}
	document.getElementById("texte").innerHTML="Clic pour zoomer et clic sur le zoom pour visionner ; Autres fonctions : clic ?";
	fenetre='<img src="media/image/z-fermer.png" style="width:50px; height:50px; position:absolute; left:775px" onclick="FermerApercu()" ></img>' // fenêtre pour le zoom ou la vidéo
	
	Initialise();
}	
//FONCTION INITIALISE
function Initialise(){
	lesImages='';
	document.getElementById("apercu").style.display = "none";
	document.getElementById("valider").style.visibility = "visible";
	document.getElementById("bloquer").style.visibility = "hidden";
	document.getElementById("nbImage").innerHTML="Nb Img "+nbImage;
	if(nbImage==56){w=145; h=103;} // 240 et 135
	else if(nbImage==6){w=580; h=240}
	else if(nbImage<10){w=386; h=240}
	else if(nbImage<13){w=386; h=180}
	else if(nbImage<17){w=290; h=180}
	else if(nbImage<21){w=232; h=180}
	else if(nbImage<26){w=232; h=144}
	else if(nbImage<31){w=193; h=144}
	//else{alert("Choisir entre 6 et 21 images"); Initialise();}
	
	// Remplir la page des images
	for (i=1; i<57; i++) {
		n=tableauImage[i];	
		if(n>0){
			lesImages+='<div id="contImage" style="width:'+w+'px; height:'+h+'px;"><img id="image'+n+'" style="width:'+w+'px; height:'+h+'px;" src="media/image/image'+n+'.PNG" onclick="zoomImg(this.id)"><div class="zoneClic" id="zoneClic'+n+'" onclick="ChoixImg(this.id)"></div><div class="cercle" id="cercle'+n+'" onclick="SupSelect(this.id)"></div></div>'
		}
	}
	document.getElementById("images").innerHTML=lesImages;
}
//FONCTIONS CONCERNANT LES IMAGES OU VIDEOS

function zoomImg(id) {// au clic sur l'image : zoom
	if(clic==1){//permet de bloquer ou débloquer l'apercu
		idImage=id;
		i=idImage.substr(5);
		
		document.getElementById("apercu").style.display = "block";
		zoom='<img src="media/image/image'+i+'.png" style="width:800px; height:500px;" onclick="clicVideo(this.id)"></img';
		document.getElementById("apercu").innerHTML=fenetre+zoom;
	}
}

function clicVideo(id){//clic sur le zoom : lance la vidéo
	video='<video width="800" height="500" controls autoplay><source src="media/video/video'+i+'.mp4" type="video/mp4"><source src="media/video/video'+i+'.ogv" type="video/ogg"><source src="media/video/video'+i+'.webm" type="video/webm"></video';
	document.getElementById("apercu").innerHTML=fenetre+video;
	
	}
		
function ChoixImg(id){//clic dans zone pour sélectionner l'image
	if(nbImage==56 || choix==1){
		choix=0;
		nbImage=0;
		for (i=0; i<57; i++){tableauImage[i]=0;}//met le tableau à 0
	}
	var idCercle=id 
	idCercle=idCercle.substr(8); // substr Prend le numéro du cercle
	document.getElementById("cercle"+idCercle).style.display ="block";//affiche le cercle
	//remplir un tableau
	tableauImage[idCercle]=idCercle;
	nbImage=nbImage+1;
	document.getElementById("nbImage").innerHTML="Nb Img : "+nbImage;
}

function SupSelect(id){//clic sur le cercle pour défaire la sélection
	var idCercle=id
	idCercle=idCercle.substr(6);
	document.getElementById("cercle"+idCercle).style.display = "none";//efface le cercle
	tableauImage[idCercle]=0;//efface les données dans le tableau
	nbImage=nbImage-1;
	document.getElementById("nbImage").innerHTML="Nb Img : "+nbImage;
}

/*function famille(id){
	alert(id);}
	if(id=="fA"){
		for (i=0; i<5; i++){tableauImage[i]=i;}
} A revoir*/
/*function clicEffaceVideo(){
	alert("ok");
	//document.getElementById("apercu").style.display = "none";
	document.getElementById("apercu").innerHTML='';
}*/
// Ne sert plus Ne marche pas revoir, le oneclic sur la vidéo plus haut dans video

//FONCTIONS CONCERNANT LES BOUTONS
function Maison(){//Accueil permet de relancer toutes les images
	nbImage=56;
	choix=0; //permet de recomptabiliser le nb d'images
	for (i=0; i<57; i++){tableauImage[i]=i;}
	document.getElementById("texte").innerHTML="Clic pour zoomer et clic sur le zoom pour visionner ; Autres fonctions : clic ?";
	Initialise();
}
function ValiderChoix(){//permet de valider le nb d'images à afficher
	if(nbImage>5 && nbImage<31){
		choix=1;
		Initialise();
		//document.getElementById("valider").style.visibility = "hidden";//cacher hidden permet de garder les propriétés par rapport à none
		document.getElementById("bloquer").style.visibility = "visible";
		document.getElementById("texte").innerHTML="Vérifiez la présence des familles <br>ou couleurs demandées";
		
	}
	else if(nbImage<6 || nbImage>30 && nbImage<56){
		alert("Choisir un nombre d'images entre 6 et 30 par un clic sur la lettre et valider");
	}
	else{
		document.getElementById("texte").innerHTML="Choisir un nombre d'images entre 6 et 21 par un clic sur la lettre et valider";
	}
}
function Masquer(){//Masque ou affiche le zoom
	if(clic==1){
		clic=0;
		//change la couleur du bouton et masque zoom
		document.getElementById("apercu").style.display = "none";
		document.getElementById("masquer").style.background="#fc9009";
		document.getElementById("texte").innerHTML="Masque la fenêtre zoom et vidéo<br>Cliquer de nouveau pour l'afficher";
	}
	else if(clic==0){
		clic=1;
		// bouton sans couleur
		document.getElementById("masquer").style.background="";
	}
}

function Aide(){//message
	alert("- Un clic sur l'image permet de la zoomer ;\n- Un clic sur le zoom permet de visionner la vidéo ;\n- Un clic sur les lettres permet de sélectionner les images et de réduire leur nombre, bouton (Valider) ;\n- Le nombre d'images sélectionnées doit être compris entre 6 et 30 pour être (Valider) ;\n- le bouton (Masquer) actif permet de masquer le zoom et la vidéo ;\n- Le bouton (Bloquer) actif, permet de masquer les boutons (Accueil) et (Valider) et d'empêcher toutes modifications ;\n- Le bouton (Accueil) permet de réinitialiser.\n\nVersion 1 réalisée par Sylvie Valencourt\nMerci aux élèves du LP Sonia Delaunay et des Gyms du LUC");
}

function Bloquer(){//permet de bloquer le retour à l'accueil
	if(bloque==1){
		bloque=0;
		document.getElementById("valider").style.visibility = "hidden";//cacher : hidden permet de garder les propriétés par rapport à none
		document.getElementById("accueil").style.visibility = "hidden";
		document.getElementById("bloquer").style.background="#fc9009";
		document.getElementById("texte").innerHTML="Masque les boutons (Accueil) et (Valider) et empêche toutes modifications";
	}
	else if(bloque==0){
		bloque=1;
		document.getElementById("valider").style.visibility = "visible";
		document.getElementById("accueil").style.visibility = "visible";
		document.getElementById("bloquer").style.background="";
	}
}
function FermerApercu(){
	document.getElementById("apercu").style.display = "none";
	}
/*function Masquer(){
	document.getElementById("apercu").style.display = "none";
}Ne marche pas*/