import graphene
import app.schema
import account.schema

class Query(app.schema.Query, account.schema.Query, graphene.ObjectType):
    pass
class Mutation(account.schema.Mutation, app.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)