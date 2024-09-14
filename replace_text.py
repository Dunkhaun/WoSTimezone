import os

def replace_text_in_file(file_path, old_text, new_text):
    """Replaces occurrences of old_text with new_text in the specified file."""
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace the text
        content = content.replace(old_text, new_text)
        
        # Write the file back
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Replaced '{old_text}' with '{new_text}' in {file_path}")
    
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    # Define the path to your HTML file
    html_file_path = 'WoSTimezone/index.html'  # Update this path

    # Define the text to replace
    old_text = 'Undefined'
    new_text = 'Convert'
    
    # Replace the text in the file
    replace_text_in_file(html_file_path, old_text, new_text)

if __name__ == "__main__":
    main()
