import os
import random
from flask import Flask, request, jsonify
from PIL import Image
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

genai.configure(api_key='AIzaSyDmGg7OnZ7a6zjHQJ1qmpZzWw1O4RGNmA8') 
model = genai.GenerativeModel('gemini-pro-vision')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def classify_fashion(image_path):
    image = Image.open(image_path)

    prompt = """
    Analyze the clothing in this image and classify it into one of the following Gen Z fashion categories:
    - Gothic
    - Cosplay
    - Aesthetic
    - Soft girl
    - IT girl
    - Coquette
    - Y2K
    - Streetwear
    - Cottagecore
    - Minimalist
    - Grunge
    - Any other gen z category
    - None

    Give the fashion Category and a small explanation.
    """

    response = model.generate_content([prompt, image])
    return response.text

# Category Classification
@app.route('/classify', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file and allowed_file(file.filename):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        try:
            result = classify_fashion(filepath)
            return jsonify({'result': result})
        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': 'File type not allowed'})

# Questionnaire
categories = [
    "Gothic", "Cosplay", "Aesthetic", "Soft girl", "It girl", "Coquette",
    "Y2K", "Grunge", "Streetwear", "Cottagecore", "E-girl/E-boy", "Minimalist"
]

questions = [
    "casual outfits",
    "formal wear",
    "accessories",
    "shoes",
    "hairstyles"
]

user_choices = []  # To store user choices

def describe_styles(prompt):
    response = model.generate_content(f"""
    Describe two different {prompt} in Gen Z fashion styles for comparison. 
    Format your response as follows:

    Style 1:
    [Brief description of the first style]

    Style 2:
    [Brief description of the second style]

    Keep each description brief and distinct.
    """)
    
    text = response.text
    styles = text.split("Style 1:")[1].split("Style 2:")
    
    if len(styles) == 2:
        return styles[0].strip(), styles[1].strip()
    else:
        return text.strip(), "Error: Could not generate two distinct styles."

def determine_categories(choices):
    weighted_categories = {category: 0 for category in categories}
    for choice in choices:
        if choice == '1':
            weighted_categories[random.choice(categories[:6])] += 1
        else:
            weighted_categories[random.choice(categories[6:])] += 1
    
    sorted_categories = sorted(weighted_categories.items(), key=lambda x: x[1], reverse=True)
    return [category for category, _ in sorted_categories[:2]]

@app.route('/get_question', methods=['GET'])
def get_question():
    if 'index' in request.args:
        index = int(request.args['index'])
        if index < len(questions):
            desc1, desc2 = describe_styles(questions[index])
            return jsonify({'question': questions[index], 'style1': desc1, 'style2': desc2})
    return jsonify({'error': 'Invalid index'}), 400

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    data = request.json
    if 'choice' in data:
        user_choices.append(data['choice'])
        if len(user_choices) == len(questions):
            recommended_categories = determine_categories(user_choices)
            return jsonify({'recommended_categories': recommended_categories})
        return jsonify({'message': 'Answer received'})
    return jsonify({'error': 'Invalid data'}), 400

# Sustainability Scoring
sustainability_criteria = {
    'organic cotton': 8,
    'recycled polyester': 7,
    'bamboo': 7,
    'hemp': 8,
    'linen': 7,
    'tencel': 8,
    'wool': 6,
    'conventional cotton': 4,
    'polyester': 2,
    'nylon': 2,
    'acrylic': 1,
    'leather': 3,
    'silk': 5
}

def analyze_sustainability_from_image(image):
    prompt = "Identify the main materials used in this product. List each material on a new line."
    response = model.generate_content([prompt, image])
    identified_materials = response.text.strip().split('\n')
    
    total_score = 0
    material_count = 0
    
    for material in identified_materials:
        material = material.lower()
        for known_material, score in sustainability_criteria.items():
            if known_material in material:
                total_score += score
                material_count += 1
                break
    
    if material_count == 0:
        return 0, "Unknown", identified_materials
    
    average_score = total_score / material_count
    
    if average_score < 4:
        category = "Low"
    elif average_score < 7:
        category = "Medium"
    else:
        category = "High"
    
    return average_score, category, identified_materials

@app.route('/analyze_sustainability', methods=['POST'])
def analyze_sustainability():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    try:
        image = Image.open(image_file)
    except OSError:
        return jsonify({'error': 'Invalid image file'}), 400

    score, category, materials = analyze_sustainability_from_image(image)
    return jsonify({'score': score, 'category': category, 'materials': materials})

if __name__ == '__main__':
    app.run(debug=True)
