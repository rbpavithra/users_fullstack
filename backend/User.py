class UserNew:
    def __init__(self,code,name,email,pw,pan=None):
        print("Constructor is called")
        self.code=code
        self.name=name
        self.email=email
        self.pw=pw